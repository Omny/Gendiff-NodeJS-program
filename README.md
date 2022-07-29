### Hexlet tests and linter status:
[![Actions Status](https://github.com/Omny/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Omny/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/fb078e82b82a577e8fdd/maintainability)](https://codeclimate.com/github/Omny/frontend-project-lvl2/maintainability)
[![Node CI](https://github.com/Omny/frontend-project-lvl2/actions/workflows/github-actions.yml/badge.svg)](https://github.com/Omny/frontend-project-lvl2/actions/workflows/github-actions.yml)

# Gendiff - NodeJS console utility

A program that determines the difference between two data structures.

[![asciicast](https://asciinema.org/a/MrBYtXgD9myEOkl9KyjdjarqL.svg)](https://asciinema.org/a/MrBYtXgD9myEOkl9KyjdjarqL)

## How to install:

make install

npm link

## How to use:

### Stylish format

gendiff filepath1.json filepath2.json

```
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
```

### Plain format

gendiff --format plain path/to/file.yml another/path/file.json

```
Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
```
