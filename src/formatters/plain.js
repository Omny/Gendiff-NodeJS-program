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

const formatToPlain = (diffTree) => {
  const iter = (data, parent) => {
    const lines = data.reduce((result, line) => {
      const [key, newValue, status, oldValue] = line;
      const fullPath = parent ? `${parent}.${key}` : key;
      switch (status) {
        case 'nested':
          return [...result, `${iter(newValue, fullPath)}`];
        case 'not changed':
          return result;
        case 'changed':
          return [...result, `Property '${fullPath}' was updated. From ${valueToStr(oldValue)} to ${valueToStr(newValue)}`];
        case 'removed':
          return [...result, `Property '${fullPath}' was removed`];
        case 'added':
          return [...result, `Property '${fullPath}' was added with value: ${valueToStr(newValue)}`];
        default:
          throw new Error(`Wrong status received: ${status}`);
      }
    }, []);
    return lines.join('\n');
  };
  return iter(diffTree);
};

export default formatToPlain;
