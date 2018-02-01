const { isLabelBlock } = require('../identifiers');

const DOLLAR_WORD_REGEX = /\$\w+/g;

const constructTitle = (title, given, when, then) => {
  return [{ label: 'given', value: given }, { label: 'when', value: when }, { label: 'then', value: then }].reduce(
    (acc, { label, value }) => {
      if (value.length > 0) {
        return `${acc} ${label}: ${value}`;
      }

      return acc;
    },
    title
  );
};

const getLabelTitle = (labels, name) => {
  const label = labels.find(isLabelBlock(name));
  return label ? label.body.expression.value : '';
};

const getInterpolatedTitleAst = (t, title) => {
  const titleChunks = title.split(DOLLAR_WORD_REGEX);
  const isTail = index => index === titleChunks.length - 1;

  const quasi = titleChunks.map((chunk, index) => t.templateElement({ cooked: chunk, raw: chunk }, isTail(index)));
  const expressions = (title.match(DOLLAR_WORD_REGEX) || []).map(value => t.identifier(value.substring(1)));

  return t.templateLiteral(quasi, expressions);
};

module.exports = { constructTitle, getInterpolatedTitleAst, getLabelTitle };
