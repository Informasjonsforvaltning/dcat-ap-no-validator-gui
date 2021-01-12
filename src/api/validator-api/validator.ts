import { ValidationRequest, RdfFile, RdfUrl } from '../../types';
import { validatorApi } from './host';

const convertRdfResourceToFormData = ({
  resource,
  version
}: ValidationRequest): FormData => {
  const formData = new FormData();
  if ((resource as RdfFile).file) {
    formData.append('file', (resource as RdfFile).file);
  } else {
    formData.append('url', (resource as RdfUrl).url);
  }
  formData.append('version', version.toString());
  return formData;
};

export const validateRdf = (request: ValidationRequest) =>
  validatorApi({
    path: '/validator',
    method: 'POST',
    headers: {
      Accept: 'application/ld+json',
      'Content-Type': 'multipart/form-data'
    },
    data: convertRdfResourceToFormData(request)
  });
