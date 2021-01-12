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

export interface ValidationReport {}

export interface DropdownMenuItem {
  label: string;
}

export interface DropdownButtonItem extends DropdownMenuItem {
  onClick: () => void;
}

export interface DropdownLinkItem extends DropdownMenuItem {
  url: string;
}
