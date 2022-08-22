import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe.each([
  ['file1.json', 'file2.json', 'stylish', 'stylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'plain.txt'],
  ['file1.json', 'file2.json', 'json', 'json.txt'],
  ['file1.yaml', 'file2.yaml', 'stylish', 'stylish.txt'],
  ['file1.yaml', 'file2.yaml', 'plain', 'plain.txt'],
  ['file1.yaml', 'file2.yaml', 'json', 'json.txt'],
])('Gendiff two files: %s & %s', (file1, file2, format, expectedFile) => {
  test(`in ${format} format`, () => {
    expect(gendiff(getFixturePath(file1), getFixturePath(file2), format)).toBe(
      readFile(expectedFile),
    );
  });
});
