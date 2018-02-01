const { isLabelBlock } = require('../identifiers');

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

module.exports = { constructTitle, getLabelTitle };
