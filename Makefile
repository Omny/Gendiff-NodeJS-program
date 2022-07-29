install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

test:
	npm test
	
make lint:
	npx eslint .
