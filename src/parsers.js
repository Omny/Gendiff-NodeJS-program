import yaml from 'js-yaml';

const parseData = (file, extension) => {
  if (extension === '.json') {
    return JSON.parse(file);
  }
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(file);
  }
  return null;
};

export default parseData;
