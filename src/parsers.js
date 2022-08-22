import yaml from 'js-yaml';

const parseData = (data, dataFormat) => {
  switch (dataFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Wrong data format: ${dataFormat}`);
  }
};

export default parseData;
