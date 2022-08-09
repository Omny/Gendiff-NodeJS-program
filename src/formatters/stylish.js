import _ from 'lodash';

const stylish = (diffTree, replacer = ' ', spacesCount = 4) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const indentSize = (spacesCount * depth) - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 2);
    const StylishLines = [];
    data.forEach((line) => {
      const [key, value, status = 'not changed', oldValue] = line;
      switch (status) {
        case 'not changed':
          StylishLines.push(`${currentIndent}  ${key}: ${iter(value, depth + 1)}`);
          break;
        case 'changed':
          StylishLines.push(`${currentIndent}- ${key}: ${iter(oldValue, depth + 1)}`);
          StylishLines.push(`${currentIndent}+ ${key}: ${iter(value, depth + 1)}`);
          break;
        case 'removed':
          StylishLines.push(`${currentIndent}- ${key}: ${iter(value, depth + 1)}`);
          break;
        case 'added':
          StylishLines.push(`${currentIndent}+ ${key}: ${iter(value, depth + 1)}`);
          break;
        default:
          throw new Error(`Wrong status received: ${status}`);
      }
    });
    const joinedText = StylishLines.join('\n');
    return `{\n${joinedText}\n${bracketIndent}}`;
  };
  return iter(diffTree, 1);
};

export default stylish;
