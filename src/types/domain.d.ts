import type { DcatVersion, Severity } from './enums';

export interface ValidationRequest {
  resource: File | url;
  version: DcatVersion;
}

export interface ValidationReport {
  conforms: boolean;
  result?: ValidationResult[];
}

export interface ValidationResult {
  resultSeverity: Severity;
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

export interface ValidationError {
  message: string;
}
