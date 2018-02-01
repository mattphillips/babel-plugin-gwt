const { constructTitle } = require('./');

describe('.constructTitle', () => {
  it('returns title when given, when and then are empty strings', () => {
    expect(constructTitle('add(a, b)', '', '', '')).toBe('add(a, b)');
  });

  it('returns title and given when, when and then are empty strings', () => {
    expect(constructTitle('add(a, b)', 'a and b', '', '')).toBe('add(a, b) given: a and b');
  });

  it('returns title and given and when, when then is an empty string', () => {
    expect(constructTitle('add(a, b)', 'a and b', 'added', '')).toBe('add(a, b) given: a and b when: added');
  });

  it('returns title and given and when and then', () => {
    expect(constructTitle('add(a, b)', 'a and b', 'added', 'returns sum')).toBe(
      'add(a, b) given: a and b when: added then: returns sum'
    );
  });

  it('returns title and given and then when, when is empty', () => {
    expect(constructTitle('add(a, b)', 'a and b', '', 'returns sum')).toBe(
      'add(a, b) given: a and b then: returns sum'
    );
  });

  it('returns title and when and then when given is empty', () => {
    expect(constructTitle('add(a, b)', '', 'added', 'returns sum')).toBe('add(a, b) when: added then: returns sum');
  });
});
