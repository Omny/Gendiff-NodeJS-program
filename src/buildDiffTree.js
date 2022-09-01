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
    if (oldValue === undefined || oldValue === newValue) {
      const status = (oldValue === undefined) ? 'added' : 'not changed';
      return [...result, [key, newValue, status]];
    }
    const status = (newValue === undefined) ? 'removed' : 'changed';
    return [...result, [key, newValue, status, oldValue]];
  }, []);
};

export default buildDiffTree;
