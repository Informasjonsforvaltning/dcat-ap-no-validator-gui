import type { Environment } from './enums';

export interface EnvironmentVariables {
  ENV: Environment;
  GRAPHQL_ENDPOINT: string;
  TRANSLATIONS_DOCUMENT: string;
  ROUTE_BASE_NAME: string;
  FDK_REGISTRATION_BASE_URI: string;
  ADMIN_GUI_BASE_URI: string;
}
