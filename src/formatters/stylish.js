import _ from 'lodash';

const stylish = (diffTree, replacer = ' ', spacesCount = 4) => {
  const iter = (data, depth) => {
    const indentSize = spacesCount * depth - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 2);
    const stylishLines = data.reduce((result, line) => {
      const [key, valueAfter, status, valueBefore] = line;
      const stylishValueAfter = _.isObject(valueAfter) ? iter(valueAfter, depth + 1) : valueAfter;
      const stylishValueBefore = _.isObject(valueBefore) ? iter(valueBefore, depth + 1) : valueBefore;
      switch (status) {
        case 'nested':
          return [...result, `${currentIndent}  ${key}: ${stylishValueAfter}`];
        case 'not changed':
          return [...result, `${currentIndent}  ${key}: ${stylishValueAfter}`];
        case 'changed':
          return [...result,
            `${currentIndent}- ${key}: ${stylishValueBefore}`,
            `${currentIndent}+ ${key}: ${stylishValueAfter}`,
          ];
        case 'removed':
          return [...result, `${currentIndent}- ${key}: ${stylishValueAfter}`];
        case 'added':
          return [...result, `${currentIndent}+ ${key}: ${stylishValueAfter}`];
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
