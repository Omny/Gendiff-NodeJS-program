import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import formatDiffTree from './formatters/index.js';

const gendiff = (path1, path2, formatName = 'stylish') => {
  const fullPath1 = path.resolve(process.cwd(), path1);
  const fullPath2 = path.resolve(process.cwd(), path2);
  const file1 = fs.readFileSync(fullPath1, 'utf-8');
  const file2 = fs.readFileSync(fullPath2, 'utf-8');
  const file1Extension = path.extname(fullPath1).slice(1);
  const file2Extension = path.extname(fullPath1).slice(1);
  const data1 = parseData(file1, file1Extension);
  const data2 = parseData(file2, file2Extension);
  const diffTree = buildDiffTree(data1, data2);
  return formatDiffTree(diffTree, formatName);
};

export default gendiff;
