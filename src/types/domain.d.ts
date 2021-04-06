import { InputType } from './enums';

interface ValidationRequestConfig {
  shapeId?: string;
  expand?: boolean;
  includeExpandedTriples?: boolean;
}
export interface ValidationRequest {
  dataGraph: File | string;
  shapesGraph: File | string;
  config: ValidationRequestConfig;
}

export interface ValidationReport {
  conforms: boolean;
  results?: ValidationResult[];
}

export interface ValidationResult {
  entityId?: string;
  entityTypes: string[];
  detail?: string;
  focusNode: string;
  resultMessage: string;
  resultPath: string;
  resultSeverity: string;
  sourceConstraintComponent?: string;
  sourceShape?: any;
  value?: string;
}

export interface ShapesDefinition {
  id: string;
  name: string;
  description: string;
  version: string;
  url: string;
  specificationName: string;
  specificationUrl: string;
  specificationVersion: string;
}

export interface ShapesCollection {
  shapes: ShapesDefinition[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface GraphField {
  name: string;
  title: string;
  placeholder?: string;
  inputType: InputType;
  checked?: boolean;
  options?: SelectOption[];
}
