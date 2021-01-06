import { RdfResource } from '../../types';
import { RdfResourceType } from '../../types/enums';
import { validatorApiPost } from './host';

const convertRdfResourceToFormData = ( {resource, type, version} :RdfResource ): FormData => {
  const formData = new FormData();
  if(type === RdfResourceType.FILE) {
    formData.append('file', resource);
  } else {
    formData.append('url', resource);
  }
  formData.append('version', version.toString());
  return formData;
}

export const validateRdfFile = (resource:RdfResource) =>
  validatorApiPost('/validator', convertRdfResourceToFormData(resource)).then(r => r.data);
