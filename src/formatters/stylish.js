import _ from 'lodash';

const getIndent = (depth) => ('    '.repeat(depth));

const stringify = (element, depth = 0) => {
  if (_.isObject(element)) {
    const lines = Object.entries(element).map(([key, value]) => `${getIndent(depth)}    ${key}: ${stringify(value, depth + 1)}`);
    const combinedLines = lines.join('\n');
    return `{\n${combinedLines}\n${getIndent(depth)}}`;
  }
  return element;
};

const stylish = (diffTree) => {
  const iter = (data, depth = 0) => {
    const lines = data.reduce((result, line) => {
      const [key, newValue, status, oldValue] = line;
      switch (status) {
        case 'nested':
          return [...result, `${getIndent(depth)}    ${key}: ${iter(newValue, depth + 1)}`];
        case 'not changed':
          return [...result, `${getIndent(depth)}    ${key}: ${stringify(newValue, depth + 1)}`];
        case 'changed':
          return [...result,
            `${getIndent(depth)}  - ${key}: ${stringify(oldValue, depth + 1)}`,
            `${getIndent(depth)}  + ${key}: ${stringify(newValue, depth + 1)}`,
          ];
        case 'removed':
          return [...result, `${getIndent(depth)}  - ${key}: ${stringify(newValue, depth + 1)}`];
        case 'added':
          return [...result, `${getIndent(depth)}  + ${key}: ${stringify(newValue, depth + 1)}`];
        default:
          throw new Error(`Wrong status received: ${status}`);
      }
    }, []);
    const combinedLines = lines.join('\n');
    return `{\n${combinedLines}\n${getIndent(depth)}}`;
  };
  return iter(diffTree, 0);
};

export default stylish;
