const each = require('jest-each');
const { transform } = require('babel-core');

const { isOnlyBlock } = require('./');

const getExpressionStatement = programAst => programAst.program.body[0];

describe('Identifers', () => {
  describe('.isOnlyBlock', () => {
    each([['it'], ['test']]).it('returns false when given %s block without only property ', name => {
      const code = `${name}("description", () => {});`;
      const { ast } = transform(code);
      const node = getExpressionStatement(ast);
      expect(isOnlyBlock(node)).toBeFalse();
    });

    each([['it'], ['test']]).it('returns true when given %s block with only property ', name => {
      const code = `${name}.only("description", () => {});`;
      const { ast } = transform(code);
      const node = getExpressionStatement(ast);
      expect(isOnlyBlock(node)).toBeTrue();
    });
  });
});
