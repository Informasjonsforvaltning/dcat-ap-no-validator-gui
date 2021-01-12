import type { RdfVersion } from './enums';

export interface RdfFile {
  file: File;
}

export interface RdfUrl {
  url: string;
}

export type RdfResource = RdfFile | RdfUrl;

export interface RdfValidationRequest {
  resource: RdfResource;
  version: RdfVersion;
}

export interface ValidationReport {
  conforms: boolean;
  result: [ValidationResult?];
}

export interface ValidationResult {
  resultSeverity: any;
  focusNode: any;
  resultPath: any;
  value: string;
  resultMessage: string;
  sourceConstraintComponent: any;
  sourceShape: any;
}

export interface DropdownMenuItem {
  label: string;
}

export interface DropdownButtonItem extends DropdownMenuItem {
  onClick: () => void;
}

export interface DropdownLinkItem extends DropdownMenuItem {
  url: string;
}
