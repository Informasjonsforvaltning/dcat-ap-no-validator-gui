import { validateEnv } from './utils/commons';

import { Environment } from './types/enums';

export default validateEnv(
  (window as any).env ?? {
    ENV: Environment.DEVELOPMENT,
    GRAPHQL_ENDPOINT: 'http://0.0.0.0:8000',
    TRANSLATIONS_DOCUMENT: 'dcat_ap_no_validator_web'
  }
);
