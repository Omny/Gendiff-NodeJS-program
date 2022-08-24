import _ from 'lodash';

const getLineIndent = (depth) => ('    '.repeat(depth).slice(2));
const getBracketIndent = (depth) => ('    '.repeat(depth).slice(4));

const stringify = (element, depth = 0) => {
  if (_.isObject(element)) {
    const lines = Object.entries(element).map(([key, value]) => `${getLineIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
    const combinedLines = lines.join('\n');
    return `{\n${combinedLines}\n${getBracketIndent(depth)}}`;
  }
  return element;
};

const stylish = (diffTree) => {
  const iter = (data, depth = 0) => {
    const lines = data.reduce((result, line) => {
      const [key, newValue, status, oldValue] = line;
      switch (status) {
        case 'nested':
          return [...result, `${getLineIndent(depth)}  ${key}: ${iter(newValue, depth + 1)}`];
        case 'not changed':
          return [...result, `${getLineIndent(depth)}  ${key}: ${stringify(newValue, depth + 1)}`];
        case 'changed':
          return [...result,
            `${getLineIndent(depth)}- ${key}: ${stringify(oldValue, depth + 1)}`,
            `${getLineIndent(depth)}+ ${key}: ${stringify(newValue, depth + 1)}`,
          ];
        case 'removed':
          return [...result, `${getLineIndent(depth)}- ${key}: ${stringify(newValue, depth + 1)}`];
        case 'added':
          return [...result, `${getLineIndent(depth)}+ ${key}: ${stringify(newValue, depth + 1)}`];
        default:
          throw new Error(`Wrong status received: ${status}`);
      }
    }, []);
    const combinedLines = lines.join('\n');
    return `{\n${combinedLines}\n${getBracketIndent(depth)}}`;
  };
  return iter(diffTree, 1);
};

export default stylish;
