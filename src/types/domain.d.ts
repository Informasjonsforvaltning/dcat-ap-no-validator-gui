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
