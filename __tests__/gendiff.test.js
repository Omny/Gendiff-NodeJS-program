import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe.each([
  ['stylish', 'file1.json', 'file2.json', 'stylish.txt'],
  ['stylish', 'file1.yaml', 'file2.yaml', 'stylish.txt'],
  ['plain', 'file1.json', 'file2.json', 'plain.txt'],
  ['plain', 'file1.yaml', 'file2.yaml', 'plain.txt'],
  // ['json', 'file1.json', 'file2.json', 'json.txt'],
  // ['json', 'file1.yaml', 'file2.yaml', 'json.txt'],
])('Gendiff two files in %s format:', (format, file1, file2, expectedFile) => {
  test(`${file1} & ${file2} are matched ${expectedFile}`, () => {
    expect(gendiff(getFixturePath(file1), getFixturePath(file2), format)).toBe(
      readFile(expectedFile),
    );
  });
});
