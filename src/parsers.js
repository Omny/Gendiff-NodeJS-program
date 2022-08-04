import yaml from 'js-yaml';

const parseData = (file, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    default:
      throw new Error(`Wrong file extension: ${extension}`);
  }
};

export default parseData;
