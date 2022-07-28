### Hexlet tests and linter status:
[![Actions Status](https://github.com/Omny/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Omny/frontend-project-lvl2/actions)

# Gendiff - NodeJS console utility

A program that determines the difference between two data structures.

[![asciicast](https://asciinema.org/a/yNcgIQUYWDbs3knA5fSHutSyD.svg)](https://asciinema.org/a/yNcgIQUYWDbs3knA5fSHutSyD)

## How to install:

make install

npm link

## How to use:

# plain foramt

gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# stylish format

gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
