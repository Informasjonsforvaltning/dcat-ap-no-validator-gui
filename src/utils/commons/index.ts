import { useLocation } from 'react-router-dom';
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

export const useQuery = () => new URLSearchParams(useLocation().search);
