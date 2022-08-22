import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff two json files in default stylish format', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(readFile('stylish.txt'));
});

test('gendiff two yaml files in default stylish format', () => {
  expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toBe(readFile('stylish.txt'));
});

test('gendiff two json files in plain format', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(readFile('plain.txt'));
});

test('gendiff two yaml files in plain format', () => {
  expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toBe(readFile('plain.txt'));
});
