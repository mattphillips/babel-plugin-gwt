const { transform } = require('babel-core');
const { getRows } = require('./');

const getExpressionStatement = programAst => programAst.program.body[0];

describe('Where', () => {
  describe('.getRows', () => {
    it('returns empty array when given labels do not contain a where label', () => {
      const code = 'random: "hello world"';
      const { ast } = transform(code);
      const node = getExpressionStatement(ast);
      expect(getRows([node])).toEqual([]);
    });

    it('returns array of where table titles from left most node', () => {
      const code = `
      where: {
        a | b || expected
      }
      `;
      const { ast } = transform(code);
      const node = getExpressionStatement(ast);
      const actual = getRows([node]);
      const [a, b, expected] = actual[0];
      expect(a.name).toBe('a');
      expect(b.name).toBe('b');
      expect(expected.name).toBe('expected');
    });

    it('returns array of where table titles and entries', () => {
      const code = `
      where: {
        a | b || expected
        1 | 2 || 3
        4 | 5 || 9
      }
      `;
      const { ast } = transform(code);
      const node = getExpressionStatement(ast);
      const actual = getRows([node]);
      const [a, b, expected] = actual[0];
      expect(a.name).toBe('a');
      expect(b.name).toBe('b');
      expect(expected.name).toBe('expected');
      const [one, two, three] = actual[1];
      expect(one.value).toBe(1);
      expect(two.value).toBe(2);
      expect(three.value).toBe(3);
      const [four, five, nine] = actual[2];
      expect(four.value).toBe(4);
      expect(five.value).toBe(5);
      expect(nine.value).toBe(9);
    });
  });
});
