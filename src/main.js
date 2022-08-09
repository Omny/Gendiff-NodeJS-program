import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseData from './parsers.js';
import formatDiffTree from './formatters/index.js';

const buildDiffTree = (data1 = {}, data2 = {}, addStatus = true) => {
  if (!_.isObject(data1)) {
    return data1;
  }
  if (!_.isObject(data2)) {
    return data2;
  }
  const allKeys = _.union(Object.keys(data1, data2), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);
  const diffTree = [];
  sortedKeys.forEach((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      const newElement = [];
      newElement[0] = key;
      newElement[1] = buildDiffTree(value1, value2);
      diffTree.push(newElement);
      return;
    }
    if (value1 === value2) {
      const newElement = [];
      newElement[0] = key;
      newElement[1] = buildDiffTree(value1, {});
      diffTree.push(newElement);
      return;
    }
    if (value1 !== undefined && value2 !== undefined) {
      const newElement = [];
      newElement[0] = key;
      newElement[1] = buildDiffTree({}, value2, false);
      if (addStatus) {
        newElement[2] = 'changed';
      }
      newElement[3] = buildDiffTree(value1, {}, false);
      diffTree.push(newElement);
      return;
    }
    if (value1 !== undefined) {
      const newElement = [];
      newElement[0] = key;
      newElement[1] = buildDiffTree(value1, {}, false);
      if (addStatus) {
        newElement[2] = 'removed';
      }
      diffTree.push(newElement);
    }
    if (value2 !== undefined) {
      const newElement = [];
      newElement[0] = key;
      newElement[1] = buildDiffTree({}, value2, false);
      if (addStatus) {
        newElement[2] = 'added';
      }
      diffTree.push(newElement);
    }
  });
  return diffTree;
};

const gendiff = (path1, path2, formatName = 'stylish') => {
  const fullPath1 = path.resolve(process.cwd(), path1);
  const fullPath2 = path.resolve(process.cwd(), path2);
  const file1 = fs.readFileSync(fullPath1, 'utf-8');
  const file2 = fs.readFileSync(fullPath2, 'utf-8');
  const file1Extension = path.extname(fullPath1);
  const file2Extension = path.extname(fullPath1);
  const data1 = parseData(file1, file1Extension);
  const data2 = parseData(file2, file2Extension);
  const diffTree = buildDiffTree(data1, data2);
  return formatDiffTree(diffTree, formatName);
};

export default gendiff;
