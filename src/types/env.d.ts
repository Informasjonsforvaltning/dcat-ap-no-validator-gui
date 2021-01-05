import type { Environment } from './enums';

export interface EnvironmentVariables {
  ENV: Environment;
  GRAPHQL_ENDPOINT: string;
  TRANSLATIONS_DOCUMENT: string;
}
