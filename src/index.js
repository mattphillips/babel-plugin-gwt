const { isOnlyBlock, isSkipBlock, isTestBlock } = require('./identifiers');
const { constructTitle, getInterpolatedTitleAst, getLabelTitle } = require('./title');
const { getRows } = require('./where');

module.exports = gwtPlugin;

const GIVEN = 'given';
const WHEN = 'when';
const THEN = 'then';

function gwtPlugin({ types: t }) {
  return {
    name: 'gwt',
    visitor: {
      ExpressionStatement(path) {
        if (!isTestBlock(path.node) && !isOnlyBlock(path.node) && !isSkipBlock(path.node)) return;

        const originalTitle = path.node.expression.arguments[0].value;
        const originalBlockBody = path.node.expression.arguments[1].body.body;
        const type = path.node.expression.callee;

        const labelStatements = originalBlockBody.filter(stmt => t.isLabeledStatement(stmt));
        const given = getLabelTitle(labelStatements, GIVEN);
        const when = getLabelTitle(labelStatements, WHEN);
        const then = getLabelTitle(labelStatements, THEN);

        const title = constructTitle(originalTitle, given, when, then);

        const whereRows = getRows(labelStatements);
        const whereTitles = whereRows.length > 0 ? whereRows[0].map(({ name }) => name) : [];

        if (!given && !when && !then && !whereTitles.length && !whereRows.length) return;

        const testTitle = t.stringLiteral(title);
        const body = originalBlockBody.filter(stmt => !t.isLabeledStatement(stmt));

        if (whereRows.length < 2) {
          const test = t.expressionStatement(
            t.callExpression(type, [testTitle, t.arrowFunctionExpression([], t.blockStatement(body))])
          );
          path.replaceWith(test);
          return;
        }

        const forEachArray = whereRows.slice(1).map(row =>
          t.objectExpression(
            whereTitles.map((title, index) => {
              return t.objectProperty(t.identifier(title), row[index]);
            })
          )
        );
        const forEachFunctionArguments = whereTitles.map(title =>
          t.objectProperty(t.identifier(title), t.identifier(title), false, true)
        );

        const test = t.expressionStatement(
          t.callExpression(t.memberExpression(t.arrayExpression(forEachArray), t.identifier('forEach')), [
            t.arrowFunctionExpression(
              [t.objectPattern(forEachFunctionArguments)],
              t.blockStatement([
                t.expressionStatement(
                  t.callExpression(type, [
                    getInterpolatedTitleAst(t, title),
                    t.arrowFunctionExpression([], t.blockStatement(body))
                  ])
                )
              ])
            )
          ])
        );

        path.replaceWith(test);
      }
    }
  };
}
