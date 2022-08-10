import _ from 'lodash';

const plain = (diffTree) => {
  const iter = (data, parent) => {
    if (typeof data === 'string') {
      return `'${data}'`;
    }
    if (typeof data === 'number' || typeof data === 'boolean' || data === null) {
      return `${data}`;
    }
    const PlainLines = [];
    data.forEach((line) => {
      const [key, value, status = 'not changed', oldValue] = line;
      const fullKey = parent ? `${parent}.${key}` : key;
      switch (status) {
        case 'not changed':
          if (_.isObject(value)) {
            PlainLines.push(`${iter(value, fullKey)}`);
          }
          break;
        case 'changed':
          if (_.isObject(oldValue)) {
            PlainLines.push(`Property '${fullKey}' was updated. From [complex value] to ${iter(value, fullKey)}`);
          } else if (_.isObject(value)) {
            PlainLines.push(`Property '${fullKey}' was updated. From ${iter(oldValue, fullKey)} to [complex value]`);
          } else {
            PlainLines.push(`Property '${fullKey}' was updated. From ${iter(oldValue, fullKey)} to ${iter(value, fullKey)}`);
          }
          break;
        case 'removed':
          PlainLines.push(`Property '${fullKey}' was removed`);
          break;
        case 'added':
          if (_.isObject(value)) {
            PlainLines.push(`Property '${fullKey}' was added with value: [complex value]`);
          } else {
            PlainLines.push(`Property '${fullKey}' was added with value: ${iter(value, fullKey)}`);
          }
          break;
        default:
          throw new Error(`Wrong status received: ${status}`);
      }
    });
    const joinedText = PlainLines.join('\n');
    return `${joinedText}`;
  };
  return iter(diffTree);
};

export default plain;
