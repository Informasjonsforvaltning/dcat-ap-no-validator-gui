import type { Environment } from './enums';

export interface EnvironmentVariables {
  ENV: Environment;
  GRAPHQL_ENDPOINT: string;
  FDK_REGISTRATION_BASE_URI: string;
  ADMIN_GUI_BASE_URI: string;
}
