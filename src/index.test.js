const pluginTester = require('babel-plugin-tester');
const plugin = require('./');

pluginTester({
  plugin,
  tests: {
    'Does not modify code when not a test': {
      code: `
      const add = (a, b) => a + b;
      `
    },
    'Does not modify code when test does not contain given, when, then, where keywords': {
      code: `
      it('does not change', () => {
        expect(true).toBeTrue();
      });
      `
    },
    'transforms it block with given label': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'
      });
      `
    },
    'transforms xit block with given label': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'
      });
      `
    },
    'transforms fit block with given label': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'
      });
      `
    },
    'transforms it.only block with given label': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'
      });
      `
    },
    'transforms it.skip block with given label': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'
      });
      `
    },
    'transforms test block with given label': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'
      });
      `
    },
    'transforms xtest block with given label': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'
      });
      `
    },
    'transforms ftest test block with given label': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'
      });
      `
    },
    'transforms test.only block with given label': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'
      });
      `
    },
    'transforms test.skip block with given label': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'
      });
      `
    },
    'transforms it block with given when then labels': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'
        const a = 1;
        const b = 1;

        when: 'added'
        const actual = a + b;

        then: 'returns 2'
        expect(actual).toBe(2);
      });
      `
    },
    'transforms it without where block when only given table titles': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'

        when: 'added'
        const actual = a + b;

        then: 'returns 2'
        expect(actual).toBe(expected);

        where: {
          a | b || expected
        }
      });
      `
    },
    'transforms it to multiple rows when given a where block tabel': {
      snapshot: true,
      code: `
      it('add', () => {
        given: 'a and b'

        when: 'added'
        const actual = a + b;

        then: 'returns 2'
        expect(actual).toBe(expected);

        where: {
          a | b || expected
          0 | 0 || 0
          1 | 1 || 2
        }
      });
      `
    }
  }
});
