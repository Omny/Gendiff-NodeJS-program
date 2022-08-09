import stylish from './stylish.js';
import plain from './plain.js';

const formatDiffTree = (diffTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    default:
      throw new Error(`Wrong format name: ${formatName}`);
  }
};

export default formatDiffTree;
