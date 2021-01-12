import { RdfValidationRequest, RdfFile, RdfUrl } from '../../types';
import { validatorApiMultipartPost } from './host';

const convertRdfResourceToFormData = ({
  resource,
  version
}: RdfValidationRequest): FormData => {
  const formData = new FormData();
  if ((resource as RdfFile).file) {
    formData.append('file', (resource as RdfFile).file);
  } else {
    formData.append('url', (resource as RdfUrl).url);
  }
  formData.append('version', version.toString());
  return formData;
};

export const validateRdf = (request: RdfValidationRequest) =>
  validatorApiMultipartPost(
    '/validator',
    convertRdfResourceToFormData(request)
  );
