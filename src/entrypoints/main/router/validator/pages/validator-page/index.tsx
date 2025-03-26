import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Severity } from '@fellesdatakatalog/alert';
import Link from '@fellesdatakatalog/link';

import withValidator, {
  Props as ValidatorProps
} from '../../../../../../components/with-validator';

import SC from './styled';

interface Props extends ValidatorProps {}

const ValidatorPage: FC<Props> = () => (
  <SC.ValidatorPage>
    <SC.Alert severity={Severity.WARNING}>
      <span>
        Validatoren er tatt ned på grunn av nødvendig vedlikehold. Mer
        informasjon kommer.
      </span>
      <Link href='https://data.norge.no/nb/contact'>
        Ta kontakt med oss hvis du har spørsmål rundt dette.
      </Link>
    </SC.Alert>
  </SC.ValidatorPage>
);

export default compose<FC>(memo, withValidator)(ValidatorPage);
