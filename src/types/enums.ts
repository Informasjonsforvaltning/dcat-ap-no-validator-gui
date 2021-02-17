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
  CONFIG = 'config'
}

export enum InputType {
  FILE = 'file',
  URL = 'url',
  TEXT = 'text',
  SELECT = 'select'
}
