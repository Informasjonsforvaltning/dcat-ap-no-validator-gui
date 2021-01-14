import {
  ValidationRequest,
  RdfFile,
  RdfUrl,
  ValidationReport
} from '../../types';
import { fixFileContentType } from '../../utils/commons';
import { validatorApi } from './host';

const mapRdfResourceToFormData = async ({
  resource,
  version
}: ValidationRequest): Promise<FormData> => {
  const formData = new FormData();
  if ((resource as RdfFile).file) {
    formData.append(
      'file',
      await fixFileContentType((resource as RdfFile).file)
    );
  } else {
    formData.append('url', (resource as RdfUrl).url);
  }
  formData.append('version', version.toString());

  return formData;
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const RDF = require('rdflib');

const sh = RDF.Namespace('http://www.w3.org/ns/shacl#');

const parseGraph = (s: string) => {
  const store = RDF.graph();
  RDF.parse(s, store, 'http://localhost', 'text/turtle');
  return store;
};

export const mapToValidationReport = (response: string): ValidationReport => {
  const store = parseGraph(response);
  const conforms = !!store.any(null, sh('conforms'), true);
  return {
    conforms,
    result: []
  };
};

export const validateRdf = (request: ValidationRequest) =>
  mapRdfResourceToFormData(request).then(formData =>
    validatorApi({
      path: '/validator',
      method: 'POST',
      headers: {
        Accept: 'text/turtle'
      },
      data: formData
    }).then((s: string) => mapToValidationReport(s))
  );
