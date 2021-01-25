interface ValidationRequestConfig {
  shapeId?: string;
  expand?: boolean;
  includeExpandedTriples?: boolean;
}
export interface ValidationRequest {
  resource: File | string;
  config: ValidationRequestConfig;
}

export interface ValidationReport {
  conforms: boolean;
  results?: ValidationResult[];
}

export interface ValidationResult {
  entityId: string;
  entityType: string;
  focusNode: string;
  resultMessage: string;
  resultPath: string;
  resultSeverity: string;
  sourceConstraintComponent?: string;
  sourceShape?: any;
  value?: string;
}

export interface GroupedValidationResults {
  entityId: string;
  entityType: string;
  entries: Record<string, ValidationResult[]>;
}
export interface ValidationError {
  message: string;
}
