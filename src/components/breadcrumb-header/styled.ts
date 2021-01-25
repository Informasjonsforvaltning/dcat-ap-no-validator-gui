import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import BreadcrumbsBase from '@fellesdatakatalog/breadcrumbs';

const BreadcrumbHeader = styled.div`
  padding: ${theme.spacing('S24')} 0;
  border-bottom: 1px solid #ddd;
`;

const BreadcrumbSeparator = styled.span`
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
`;

const Breadcrumbs = styled(BreadcrumbsBase)`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: auto;
  width: 1140px;
  margin: 0 auto;

  @media (max-width: 1204px) {
    & {
      width: auto;
      margin: 0 ${theme.spacing('S32')};
    }
  }

  @media (max-width: 900px) {
    & {
      margin: 0 calc(12px + (32 - 12) * ((100vw - 320px) / (900 - 320)));
    }
  }
`;

export default {
  BreadcrumbHeader,
  Breadcrumbs,
  BreadcrumbSeparator
};
