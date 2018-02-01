const looksLike = require('../utils/looks-like');

const hasBodyFunction = args =>
  looksLike(args[1], {
    type: t => t === 'ArrowFunctionExpression' || t === 'FunctionExpression'
  });

const isOnlyBlock = path =>
  looksLike(path, {
    expression: {
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: n => n === 'it' || n === 'test'
        },
        property: {
          type: 'Identifier',
          name: 'only'
        }
      },
      arguments: hasBodyFunction
    }
  });

module.exports = {
  isOnlyBlock
};
