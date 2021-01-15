/* eslint-disable max-classes-per-file */
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

export class HttpError extends Error {
  constructor(public code: number, message?: string) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.name = 'HttpError';
  }
}

export class ApiError extends Error {
  constructor(message?: string) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = 'ApiError';
  }
}
