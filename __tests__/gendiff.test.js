import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe.each([['stylish'], ['plain'], ['json']])('Gendiff two files in %s format:', (formatName) => {
  const expectedData = readFile(`${formatName}.txt`);

  test.each([['json'], ['yaml']])('%s files', (extension) => {
    const filePath1 = getFixturePath(`file1.${extension}`);
    const filePath2 = getFixturePath(`file2.${extension}`);
    const resultData = gendiff(filePath1, filePath2, formatName);

    expect(resultData).toBe(expectedData);
  });
});
