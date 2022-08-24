import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);
  return sortedKeys.reduce((result, key) => {
    const oldValue = data1[key];
    const newValue = data2[key];
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      const status = 'nested';
      return [...result, [key, buildDiffTree(oldValue, newValue), status]];
    }
    if (oldValue === newValue) {
      const status = 'not changed';
      return [...result, [key, newValue, status]];
    }
    if (oldValue !== undefined && newValue !== undefined) {
      const status = 'changed';
      return [...result, [key, newValue, status, oldValue]];
    }
    if (oldValue !== undefined) {
      const status = 'removed';
      return [...result, [key, oldValue, status]];
    }
    const status = 'added';
    return [...result, [key, newValue, status]];
  }, []);
};

export default buildDiffTree;
