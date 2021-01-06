import type { RdfResourceType, RdfVersion } from './enums';

export interface RdfResource {
  resource: any;
  type: ResourceType;
  version: RdfVersion
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
