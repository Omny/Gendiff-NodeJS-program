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
      switch (status) {
        case 'not changed':
          return [
            ...result,
            `${currentIndent}  ${key}: ${iter(value, depth + 1)}`,
          ];
        case 'changed':
          return [
            ...result,
            `${currentIndent}- ${key}: ${iter(oldValue, depth + 1)}`,
            `${currentIndent}+ ${key}: ${iter(value, depth + 1)}`,
          ];
        case 'removed':
          return [
            ...result,
            `${currentIndent}- ${key}: ${iter(value, depth + 1)}`,
          ];
        case 'added':
          return [
            ...result,
            `${currentIndent}+ ${key}: ${iter(value, depth + 1)}`,
          ];
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
