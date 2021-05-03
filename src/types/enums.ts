export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export enum Path {
  VALIDATOR = '/validator'
}

export enum Severity {
  VIOLATION = 'Violation',
  WARNING = 'Warning',
  INFO = 'Info'
}

export enum RequestParameter {
  DATA_GRAPH_FILE = 'data-graph-file',
  DATA_GRAPH_URL = 'data-graph-url',
  SHAPES_GRAPH_FILE = 'shapes-graph-file',
  SHAPES_GRAPH_URL = 'shapes-graph-url',
  ONTOLOGY_GRAPH_FILE = 'ontology-graph-file',
  ONTOLOGY_GRAPH_URL = 'ontology-graph-url',
  CONFIG = 'config'
}

export enum InputType {
  FILE = 'file',
  URL = 'url',
  TEXT = 'text',
  SELECT = 'select'
}

export enum Vocabulary {
  SHACL = 'http://www.w3.org/ns/shacl#',
  RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  DCAT = 'http://www.w3.org/ns/dcat#',
  XML = 'http://www.w3.org/2001/XMLSchema#'
}
