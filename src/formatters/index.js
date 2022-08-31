import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';
import formatToJson from './json.js';

const formatDiffTree = (diffTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatToStylish(diffTree);
    case 'plain':
      return formatToPlain(diffTree);
    case 'json':
      return formatToJson(diffTree);
    default:
      throw new Error(`Wrong format name: ${formatName}`);
  }
};

export default formatDiffTree;
