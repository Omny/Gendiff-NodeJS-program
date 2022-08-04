import _ from 'lodash';

const getStylishStatusSign = (status) => {
  let statusSign = '';
  switch (status) {
    case 0:
      statusSign = ' ';
      break;
    case -1:
      statusSign = '-';
      break;
    case 1:
      statusSign = '+';
      break;
    default:
      throw new Error(`Wrong status received: ${status}`);
  }
  return statusSign;
};

const stylish = (diffTree, replacer = ' ', spacesCount = 4) => {
  // console.log(diffTree);
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const indentSize = (spacesCount * depth) - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 2);
    const StylishLines = [];
    data.forEach((line) => {
      const [key, value, status = 0] = line;
      const statusSign = getStylishStatusSign(status);
      StylishLines.push(`${currentIndent}${statusSign} ${key}: ${iter(value, depth + 1)}`);
    });
    const joinedText = StylishLines.join('\n');
    return `{\n${joinedText}\n${bracketIndent}}`;
  };
  return iter(diffTree, 1);
};

const formatDiffTree = (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diffTree);
    // case 'other':
    //  return other(diffTree);
    default:
      throw new Error(`Wrong format: ${format}`);
  }
};

export default formatDiffTree;
