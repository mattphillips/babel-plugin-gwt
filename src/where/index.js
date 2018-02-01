const { isLabelBlock } = require('../identifiers');

const WHERE = 'where';

const getRowData = node => {
  let acc = [];
  if (node.left) {
    acc.push(...getRowData(node.left));
  }

  if (node.right) {
    acc.push(...getRowData(node.right));
  }

  if (!node.left && !node.right) {
    acc.push(node);
  }

  return acc;
};

const getRows = labels => {
  const label = labels.find(isLabelBlock(WHERE));

  if (label) {
    return label.body.body.map(node => getRowData(node.expression));
  }
  return [];
};

module.exports = {
  getRows
};
