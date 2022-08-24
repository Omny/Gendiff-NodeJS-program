import _ from 'lodash';

const valueToStr = (valueAfter) => {
  if (typeof valueAfter === 'string') {
    return `'${valueAfter}'`;
  }
  if (_.isObject(valueAfter)) {
    return '[complex value]';
  }
  return `${valueAfter}`;
};

const plain = (diffTree) => {
  const iter = (data, parent) => {
    const plainLines = data.reduce((result, line) => {
      const [key, valueAfter, status, valueBefore] = line;
      const fullKey = parent ? `${parent}.${key}` : key;
      const plainValueAfter = valueToStr(valueAfter);
      const plainValueBefore = valueToStr(valueBefore);
      switch (status) {
        case 'nested':
          return _.isObject(valueAfter) ? [...result, `${iter(valueAfter, fullKey)}`] : result;
        case 'not changed':
          return _.isObject(valueAfter) ? [...result, `${iter(valueAfter, fullKey)}`] : result;
        case 'changed':
          return [...result, `Property '${fullKey}' was updated. From ${plainValueBefore} to ${plainValueAfter}`];
        case 'removed':
          return [...result, `Property '${fullKey}' was removed`];
        case 'added':
          return [...result, `Property '${fullKey}' was added with value: ${plainValueAfter}`];
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
