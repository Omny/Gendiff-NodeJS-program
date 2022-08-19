import _ from 'lodash';

const buildDiffTree = (data1 = {}, data2 = {}, addStatus = true) => {
  if (!_.isObject(data2)) {
    return data2;
  }
  if (!_.isObject(data1)) {
    return data1;
  }
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);
  return sortedKeys.reduce((result, key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      const currentValue = buildDiffTree(value1, value2, true);
      const status = 'not changed';
      return [...result, [key, currentValue, status]];
    }
    const currentValue = buildDiffTree(value1, value2, false);
    const oldValue = buildDiffTree(value1, {}, false);
    if (value1 === value2) {
      const status = 'not changed';
      return [...result, [key, currentValue, status]];
    }
    if (value1 !== undefined && value2 !== undefined) {
      const status = 'changed';
      return [...result, [key, currentValue, status, oldValue]];
    }
    if (value1 !== undefined) {
      const status = addStatus ? 'removed' : 'not changed';
      return [...result, [key, oldValue, status]];
    }
    if (value2 !== undefined) {
      const status = addStatus ? 'added' : 'not changed';
      return [...result, [key, currentValue, status]];
    }
    return result;
  }, []);
};

export default buildDiffTree;
