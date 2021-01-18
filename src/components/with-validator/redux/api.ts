import axios from 'axios';
import { Namespace, graph, parse, term } from 'rdflib';
import {
  ValidationRequest,
  RdfFile,
  RdfUrl,
  ValidationReport
} from '../../../types';
import { fixFileContentType } from '../../../utils/commons';
import env from '../../../env';

const { VALIDATOR_API_HOST } = env;

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

const sh = Namespace('http://www.w3.org/ns/shacl#');
const parseGraph = (s: string) => {
  const store = graph();
  parse(s, store, 'http://localhost', 'text/turtle');
  return store;
};

export const mapToValidationReport = (response: string): ValidationReport => {
  const store = parseGraph(response);
  const conforms = !!store.any(null, sh('conforms'), term(true));
  return {
    conforms,
    result: []
  };
};

export const validateRdf = (request: ValidationRequest) =>
  mapRdfResourceToFormData(request).then(formData =>
    axios({
      url: `${VALIDATOR_API_HOST}/validator`,
      method: 'POST',
      headers: {
        Accept: 'text/turtle'
      },
      data: formData
    }).catch(error => error)
  );
