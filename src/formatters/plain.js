import _ from 'lodash';

const plain = (diffTree) => {
  const iter = (data, parent) => {
    if (typeof data === 'string') {
      return `'${data}'`;
    }
    if (typeof data === 'number' || typeof data === 'boolean' || data === null || data === undefined) {
      return `${data}`;
    }
    const plainLines = data.reduce((result, line) => {
      const [key, value, status = 'not changed', oldValue] = line;
      const fullKey = parent ? `${parent}.${key}` : key;
      const plainValue = _.isObject(value) ? '[complex value]' : iter(value, fullKey);
      const plainOldValue = _.isObject(oldValue) ? '[complex value]' : iter(oldValue, fullKey);
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
    return `${joinedText}`;
  };
  return iter(diffTree);
};

export default plain;
