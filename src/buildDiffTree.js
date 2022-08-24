import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);
  return sortedKeys.reduce((result, key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      const newValue = buildDiffTree(value1, value2);
      const status = 'nested';
      return [...result, [key, newValue, status]];
    }
    const newValue = value2;
    const oldValue = value1;
    if (value1 === value2) {
      const status = 'not changed';
      return [...result, [key, newValue, status]];
    }
    if (value1 !== undefined && value2 !== undefined) {
      const status = 'changed';
      return [...result, [key, newValue, status, oldValue]];
    }
    if (value1 !== undefined) {
      const status = 'removed';
      return [...result, [key, oldValue, status]];
    }
    const status = 'added';
    return [...result, [key, newValue, status]];
  }, []);
};

export default buildDiffTree;
