import _ from 'lodash';

const buildDiffTree = (data1 = {}, data2 = {}, addStatus = true) => {
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
    const newValue = _.isObject(value2) ? buildDiffTree(value1, value2, false) : value2;
    const oldValue = _.isObject(value1) ? buildDiffTree(value1, {}, false) : value1;
    if (value1 === value2) {
      const status = 'not changed';
      return [...result, [key, newValue, status]];
    }
    if (value1 !== undefined && value2 !== undefined) {
      const status = 'changed';
      return [...result, [key, newValue, status, oldValue]];
    }
    if (value1 !== undefined) {
      const status = addStatus ? 'removed' : 'not changed';
      return [...result, [key, oldValue, status]];
    }
    const status = addStatus ? 'added' : 'not changed';
    return [...result, [key, newValue, status]];
  }, []);
};

export default buildDiffTree;
