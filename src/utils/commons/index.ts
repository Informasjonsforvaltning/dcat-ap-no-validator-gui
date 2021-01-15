import type { EnvironmentVariables, ValidationError } from '../../types';

function assertIsDefined<T>(
  key: string,
  value: T
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Expected ${key} to be defined, but received ${value}`);
  }
}

export const validateEnv = (
  env: EnvironmentVariables
): EnvironmentVariables => {
  Object.entries(env).forEach(([key, value]) => assertIsDefined(key, value));

  return env;
};

const readFileAsDataURL = async (file: File) => {
  const fileContent: string = await new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.readAsText(file);
  });

  return fileContent;
};

export const fixFileContentType = async (file: File) => {
  const fileContent = await readFileAsDataURL(file);
  try {
    JSON.parse(fileContent);
    return new File([fileContent], file.name, {
      type: 'application/ld+json'
    });
  } catch (e) {
    return new File([fileContent], file.name, {
      type: 'text/turtle'
    });
  }
};

export const InvalidRequestException = (message: string): ValidationError => ({
  message,
  name: 'InvalidRequestException'
});

export const UnsupportedContentTypeException = (
  message: string
): ValidationError => ({
  message,
  name: 'UnsupportedContentTypeException'
});

export const InternalServerException = (message: string): ValidationError => ({
  message,
  name: 'InternalServerException'
});

export const UnknownException = (message: string): ValidationError => ({
  message,
  name: 'UnknownException'
});
