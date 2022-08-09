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
      const [key, value = '[complex value]', status = 'not changed', oldValue = '[complex value]'] = line;
      const fullKey = parent ? `${parent}.${key}` : key;
      let statusText = '';
      switch (status) {
        case 'not changed':
          statusText = 'not changed';
          if (_.isObject(value)) {
            PlainLines.push(`${iter(value, fullKey)}`);
          }
          break;
        case 'changed':
          statusText = 'was updated.';
          if (_.isObject(oldValue)) {
            PlainLines.push(`Property '${fullKey}' ${statusText} From [complex value] to ${iter(value, fullKey)}`);
          } else if (_.isObject(value)) {
            PlainLines.push(`Property '${fullKey}' ${statusText} From ${iter(oldValue, fullKey)} to [complex value]`);
          } else {
            PlainLines.push(`Property '${fullKey}' ${statusText} From ${iter(oldValue, fullKey)} to ${iter(value, fullKey)}`);
          }
          break;
        case 'removed':
          statusText = 'was removed';
          PlainLines.push(`Property '${fullKey}' ${statusText}`);
          break;
        case 'added':
          statusText = 'was added with value:';
          if (_.isObject(value)) {
            PlainLines.push(`Property '${fullKey}' ${statusText} [complex value]`);
          } else {
            PlainLines.push(`Property '${fullKey}' ${statusText} ${iter(value, fullKey)}`);
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
