import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import formatDiffTree from './formatters/index.js';

const getFullFilePath = (filePath) => path.resolve(process.cwd(), filePath);

const getDataFromFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const dataFormat = path.extname(filePath).slice(1);
  return parseData(data, dataFormat);
};

const gendiff = (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = getDataFromFile(getFullFilePath(filePath1));
  const data2 = getDataFromFile(getFullFilePath(filePath2));
  const diffTree = buildDiffTree(data1, data2);
  return formatDiffTree(diffTree, formatName);
};

export default gendiff;
