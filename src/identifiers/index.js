const looksLike = require('../utils/looks-like');

const TEST_NAMES = ['it', 'test', 'fit', 'ftest', 'xit', 'xtest'];

const hasBodyFunction = args =>
  looksLike(args[1], {
    type: t => t === 'ArrowFunctionExpression' || t === 'FunctionExpression'
  });

const isLabelBlock = name => path =>
  looksLike(path, {
    label: { type: 'Identifier', name }
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

const isSkipBlock = path =>
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
          name: 'skip'
        }
      },
      arguments: hasBodyFunction
    }
  });

const isTestBlock = path =>
  looksLike(path, {
    expression: {
      callee: {
        type: 'Identifier',
        name: name => TEST_NAMES.includes(name)
      }
    }
  });

module.exports = {
  isLabelBlock,
  isOnlyBlock,
  isSkipBlock,
  isTestBlock
};
