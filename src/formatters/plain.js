import _ from 'lodash';

const valueToStr = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `${value}`;
};

const plain = (diffTree) => {
  const iter = (data, parent) => {
    const plainLines = data.reduce((result, line) => {
      const [key, value, status, oldValue] = line;
      const fullKey = parent ? `${parent}.${key}` : key;
      const plainValue = valueToStr(value);
      const plainOldValue = valueToStr(oldValue);
      switch (status) {
        case 'not changed':
          return _.isObject(value) ? [...result, `${iter(value, fullKey)}`] : result;
        case 'changed':
          return [...result, `Property '${fullKey}' was updated. From ${plainOldValue} to ${plainValue}`];
        case 'removed':
          return [...result, `Property '${fullKey}' was removed`];
        case 'added':
          return [...result, `Property '${fullKey}' was added with value: ${plainValue}`];
        default:
          throw new Error(`Wrong status received: ${status}`);
      }
    }, []);
    const joinedText = plainLines.join('\n');
    return joinedText;
  };
  return iter(diffTree);
};

export default plain;
