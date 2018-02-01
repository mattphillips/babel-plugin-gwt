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

module.exports = { constructTitle };
