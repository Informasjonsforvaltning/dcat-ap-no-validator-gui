import {
  Namespace,
  graph,
  parse,
  term,
  Store,
  NamedNode,
  isNamedNode,
  isBlankNode,
  Statement,
  Node
} from 'rdflib';

import env from '../../../env';

import type { ValidationRequest, ValidationReport } from '../../../types';
import { RequestParameter } from '../../../types/enums';

const { FDK_BASE_URI } = env;

const sh = Namespace('http://www.w3.org/ns/shacl#');
const rdf = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
const dcat = Namespace('http://www.w3.org/ns/dcat#');

export const createFormData = async ({
  resource,
  config
}: ValidationRequest) => {
  const formData = new FormData();

  if (resource instanceof File) {
    formData.append(RequestParameter.DATA_GRAPH_FILE, resource);
  } else {
    formData.append(RequestParameter.DATA_GRAPH_URL, resource);
  }

  formData.append(RequestParameter.CONFIG, JSON.stringify(config));

  return formData;
};

const parseGraph = (g: string): Store => {
  const store = graph();

  try {
    parse(g, store, FDK_BASE_URI, 'text/turtle');
  } catch (e) {
    // do nothing
  }

  return store;
};

const findConnected = (store: Store, node: Node): Statement[] =>
  isNamedNode(node) || isBlankNode(node)
    ? store
        .statementsMatching(node)
        .reduce(
          (previous, current) => [
            ...previous,
            current,
            ...findConnected(store, current.object)
          ],
          [] as Statement[]
        )
    : [];

const mapToValidationResult = (store: Store, node: any) => {
  const resultSeverity = (store.anyStatementMatching(node, sh('resultSeverity'))
    ?.object as NamedNode).id();
  const focusNode = (store.anyStatementMatching(node, sh('focusNode'))
    ?.object as NamedNode)?.uri;
  const resultPath = (store.anyStatementMatching(node, sh('resultPath'))
    ?.object as NamedNode)?.uri;
  const value = store
    .anyStatementMatching(node, sh('value'))
    ?.object.toString();
  const sourceShape = (store.anyStatementMatching(node, sh('sourceShape'))
    ?.object as NamedNode)?.uri;
  const detail = (store.anyStatementMatching(node, sh('detail'))
    ?.object as NamedNode)?.uri;
  const resultMessage = store
    .statementsMatching(node, sh('resultMessage'))
    .shift()?.object.value;

  return {
    resultSeverity,
    focusNode,
    resultPath,
    value,
    sourceShape,
    detail,
    resultMessage
  };
};

export const createValidationReport = (g: string): ValidationReport => {
  const store = parseGraph(g);
  const conforms = !!store.any(null, sh('conforms'), term(true));

  const entities = [
    ...store.each(null, rdf('type'), dcat('Dataset')),
    ...store.each(null, rdf('type'), dcat('DataService')),
    ...store.each(null, rdf('type'), dcat('Catalog'))
  ].filter(isNamedNode) as NamedNode[];

  const results = store
    .each(null, null, sh('ValidationResult'))
    .map(node => {
      const focusNode = (store.anyStatementMatching(
        node as any,
        sh('focusNode')
      )?.object as NamedNode).value;

      const relatedEntity = entities.find(
        entity =>
          entity.value === focusNode ||
          findConnected(store, entity)
            .map(({ object }) => object.value)
            .includes(focusNode)
      );

      return relatedEntity
        ? {
            ...mapToValidationResult(store, node),
            entityId: relatedEntity.value,
            entityType: store.anyStatementMatching(relatedEntity, rdf('type'))
              ?.object.value
          }
        : null;
    })
    .filter(Boolean) as any;

  return {
    conforms,
    results
  };
};

export const isValidUrl = (url: string) => {
  try {
    return !!new URL(url);
  } catch (e) {
    return false;
  }
};
