import _ from 'lodash';

const stylish = (diffTree, replacer = ' ', spacesCount = 4) => {
  const iter = (data, depth) => {
    const indentSize = spacesCount * depth - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 2);
    const stylishLines = data.reduce((result, line) => {
      const [key, newValue, status, oldValue] = line;
      const stylishNewValue = _.isObject(newValue) ? iter(newValue, depth + 1) : newValue;
      const stylishOldValue = _.isObject(oldValue) ? iter(oldValue, depth + 1) : oldValue;
      switch (status) {
        case 'nested':
          return [...result, `${currentIndent}  ${key}: ${stylishNewValue}`];
        case 'not changed':
          return [...result, `${currentIndent}  ${key}: ${stylishNewValue}`];
        case 'changed':
          return [...result,
            `${currentIndent}- ${key}: ${stylishOldValue}`,
            `${currentIndent}+ ${key}: ${stylishNewValue}`,
          ];
        case 'removed':
          return [...result, `${currentIndent}- ${key}: ${stylishNewValue}`];
        case 'added':
          return [...result, `${currentIndent}+ ${key}: ${stylishNewValue}`];
        default:
          throw new Error(`Wrong status received: ${status}`);
      }
    }, []);
    const joinedText = stylishLines.join('\n');
    return `{\n${joinedText}\n${bracketIndent}}`;
  };
  return iter(diffTree, 1);
};

export default stylish;
