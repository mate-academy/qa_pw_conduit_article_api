import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const normalizedPath = fileName.replace(/\\/g, '/');
  const testFolder = 'tests/';
  const folderIndex = normalizedPath.indexOf(testFolder);

  if (folderIndex === -1) {
    throw new Error(`Tests folder not found in path: ${fileName}`);
  }

  const attributes = normalizedPath
    .slice(folderIndex + testFolder.length)
    .split('/')
    .filter(part => !part.endsWith('.spec.js'))
    .map(part => capitalize(camelCaseToPhrase(part)));

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}
