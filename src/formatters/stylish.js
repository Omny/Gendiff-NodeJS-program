import _ from 'lodash';

const stylish = (diffTree, replacer = ' ', spacesCount = 4) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const indentSize = spacesCount * depth - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 2);
    const stylishLines = data.reduce((result, line) => {
      const [key, value, status = 'not changed', oldValue] = line;
      const stylishValue = iter(value, depth + 1);
      const stylishOldValue = iter(oldValue, depth + 1);
      switch (status) {
        case 'not changed':
          return [...result, `${currentIndent}  ${key}: ${stylishValue}`];
        case 'changed':
          return [
            ...result,
            `${currentIndent}- ${key}: ${stylishOldValue}`,
            `${currentIndent}+ ${key}: ${stylishValue}`,
          ];
        case 'removed':
          return [...result, `${currentIndent}- ${key}: ${stylishValue}`];
        case 'added':
          return [...result, `${currentIndent}+ ${key}: ${stylishValue}`];
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
