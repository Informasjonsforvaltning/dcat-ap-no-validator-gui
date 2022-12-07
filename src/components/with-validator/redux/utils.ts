import { Parser, Store, DataFactory, Util, Quad, Term } from 'n3';

import type {
  ValidationRequest,
  ValidationReport,
  ValidationResult
} from '../../../types';
import { Vocabulary, RequestParameter } from '../../../types/enums';

const { namedNode, literal, defaultGraph } = DataFactory;
const { isNamedNode, isBlankNode, isLiteral } = Util;

const sh = (value: string) => `${Vocabulary.SHACL}${value}`;
const xml = (value: string) => `${Vocabulary.XML}${value}`;
const rdf = (value: string) => `${Vocabulary.RDF}${value}`;
const dcat = (value: string) => `${Vocabulary.DCAT}${value}`;

export const createFormData = async ({
  dataGraph,
  shapesGraph,
  ontologyGraph,
  config
}: ValidationRequest) => {
  const formData = new FormData();

  formData.append(
    dataGraph instanceof File
      ? RequestParameter.DATA_GRAPH_FILE
      : RequestParameter.DATA_GRAPH_URL,
    dataGraph
  );
  formData.append(
    shapesGraph instanceof File
      ? RequestParameter.SHAPES_GRAPH_FILE
      : RequestParameter.SHAPES_GRAPH_URL,
    shapesGraph
  );
  formData.append(
    ontologyGraph instanceof File
      ? RequestParameter.ONTOLOGY_GRAPH_FILE
      : RequestParameter.ONTOLOGY_GRAPH_URL,
    ontologyGraph
  );
  formData.append(RequestParameter.CONFIG, JSON.stringify(config));

  return formData;
};

const findConnected = (store: Store, node: Term): Quad[] =>
  isNamedNode(node) || isBlankNode(node)
    ? store
        .getQuads(node, null, null, defaultGraph())
        .reduce(
          (previous, current) => [
            ...previous,
            current,
            ...(current.subject.equals(node) ||
            current.subject.equals(current.object) ||
            isLiteral(current.object)
              ? []
              : findConnected(store, current.object))
          ],
          [] as Quad[]
        )
    : [];

const mapToValidationResult = (
  node: any,
  store: Store,
  entityTypes: string[],
  entityId?: string
): ValidationResult => {
  const resultSeverity =
    store.getObjects(node, sh('resultSeverity'), defaultGraph()).shift()?.id ||
    '';
  const focusNode =
    store.getObjects(node, sh('focusNode'), defaultGraph()).shift()?.value ||
    '';
  const resultPath =
    store.getObjects(node, sh('resultPath'), defaultGraph()).shift()?.value ||
    '';
  const value = store
    .getObjects(node, sh('value'), defaultGraph())
    .shift()?.value;
  const sourceShape = store
    .getObjects(node, sh('sourceShape'), defaultGraph())
    .shift()?.id;
  const sourceConstraintComponent =
    store
      .getObjects(node, sh('sourceConstraintComponent'), defaultGraph())
      .shift()?.value || '';
  const resultMessage =
    store.getObjects(node, sh('resultMessage'), defaultGraph()).shift()
      ?.value || '';

  return {
    resultSeverity,
    focusNode,
    resultPath,
    value,
    sourceShape,
    sourceConstraintComponent,
    resultMessage,
    entityId,
    entityTypes
  };
};

export const createValidationReport = (ttl: string): ValidationReport => {
  const parser = new Parser({ format: 'Turtle' });
  const store = new Store(parser.parse(ttl));

  const conforms = store.some(
    () => true,
    null,
    sh('conforms'),
    literal('true', namedNode(xml('boolean'))),
    defaultGraph()
  );

  const entities = [
    ...store.getSubjects(rdf('type'), dcat('Dataset'), defaultGraph()),
    ...store.getSubjects(rdf('type'), dcat('DataService'), defaultGraph()),
    ...store.getSubjects(rdf('type'), dcat('Catalog'), defaultGraph())
  ];

  const results = store
    .getSubjects(null, sh('ValidationResult'), defaultGraph())
    .map(node => {
      const focusNode = store
        .getObjects(node, sh('focusNode'), defaultGraph())
        .shift()?.value;

      const relatedEntity = entities.find(
        entity =>
          entity.value === focusNode ||
          findConnected(store, entity)
            .map(({ object }) => object.value)
            .includes(focusNode ?? '')
      );

      return relatedEntity
        ? mapToValidationResult(
            node,
            store,
            store
              .getObjects(relatedEntity, rdf('type'), defaultGraph())
              .map(({ value }) => value),
            relatedEntity.value
          )
        : mapToValidationResult(node, store, []);
    });

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
