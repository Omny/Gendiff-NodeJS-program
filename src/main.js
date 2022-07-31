import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const parseData = (file, extension) => {
  if (extension === '.json') {
    return JSON.parse(file);
  }
  return {};
};

const compareData = (data1, data2) => {
  const allKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const difference = [];
  allKeys.forEach((key) => {
    if (data1[key] === data2[key]) {
      difference.push(`    ${key}: ${data1[key]}`);
      return;
    }
    if (Object.hasOwn(data1, key)) {
      difference.push(`  - ${key}: ${data1[key]}`);
    }
    if (Object.hasOwn(data2, key)) {
      difference.push(`  + ${key}: ${data2[key]}`);
    }
  });

  return `{\n${difference.join('\n')}\n}`;
};

// const gendiff = (path1, path2, format = 'json') => {

const gendiff = (path1, path2) => {
  const fullPath1 = path.resolve(process.cwd(), path1);
  const fullPath2 = path.resolve(process.cwd(), path2);
  const file1 = fs.readFileSync(fullPath1, 'utf-8');
  const file2 = fs.readFileSync(fullPath2, 'utf-8');
  const file1Extension = path.extname(fullPath1);
  const file2Extension = path.extname(fullPath1);
  const data1 = parseData(file1, file1Extension);
  const data2 = parseData(file2, file2Extension);
  const result = compareData(data1, data2);
  return result;
};

export default gendiff;
