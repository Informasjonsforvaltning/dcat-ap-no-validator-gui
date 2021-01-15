import { validateEnv } from './utils/commons';

import { Environment } from './types/enums';

export default validateEnv(
  (window as any).env ?? {
    ENV: Environment.DEVELOPMENT,
    GRAPHQL_ENDPOINT: 'http://0.0.0.0:8000',
    VALIDATOR_API_HOST: 'http://localhost:8080',
    FDK_REGISTRATION_BASE_URI:
      'https://registrering.fellesdatakatalog.digdir.no/',
    ADMIN_GUI_BASE_URI: 'https://admin.fellesdatakatalog.digdir.no/'
  }
);
