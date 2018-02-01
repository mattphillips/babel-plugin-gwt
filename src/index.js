const { isOnlyBlock, isSkipBlock, isTestBlock } = require('./identifiers');
const { constructTitle, getLabelTitle } = require('./title');

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

        if (!given && !when && !then) return;

        const testTitleAst = t.stringLiteral(title);
        const body = originalBlockBody.filter(stmt => !t.isLabeledStatement(stmt));

        const test = t.expressionStatement(
          t.callExpression(type, [testTitleAst, t.arrowFunctionExpression([], t.blockStatement(body))])
        );

        path.replaceWith(test);
      }
    }
  };
}
