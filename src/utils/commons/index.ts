import type { EnvironmentVariables } from '../../types';

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

const readFileAsText = async (file: File) =>
  new Promise<string>(resolve => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.readAsText(file);
  });

export const fixFileContentType = async (file: File) => {
  const fileContent = await readFileAsText(file);
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
