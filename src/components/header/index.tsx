import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';

import { Trigger, Menu } from '@fellesdatakatalog/dropdown-menu';
import env from '../../env';

import SC from './styled';

const { FDK_REGISTRATION_BASE_URI, ADMIN_GUI_BASE_URI, FDK_BASE_URI } = env;

const Header: FC = () => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const openDropdownMenu = () => setIsDropdownMenuOpen(true);
  const closeDropdownMenu = () => setIsDropdownMenuOpen(false);

  return (
    <SC.Header>
      <SC.Row>
        <SC.Link href={`${FDK_BASE_URI}/publishing`}>
          <SC.Logo />
        </SC.Link>
        <SC.NavigationLinks>
          <li>
            <SC.Link href={FDK_REGISTRATION_BASE_URI}>Registrere data</SC.Link>
          </li>
          <li>
            <SC.Link href={ADMIN_GUI_BASE_URI}>Høste data</SC.Link>
          </li>
          <li>
            <SC.Link href='/publishing/terms-of-use'>Bruksvilkår</SC.Link>
          </li>
          <li>
            <SC.Link href='/' target='_self' external>
              Søk i Felles datakatalog
            </SC.Link>
          </li>
        </SC.NavigationLinks>
        <SC.DropdownMenu
          isOpen={isDropdownMenuOpen}
          onClose={closeDropdownMenu}
        >
          <Trigger>
            <SC.MenuButton onClick={openDropdownMenu}>Meny</SC.MenuButton>
          </Trigger>
          <Menu>
            <SC.Menu>
              <li>
                <SC.Link href={FDK_REGISTRATION_BASE_URI}>
                  Registrere data
                </SC.Link>
              </li>
              <li>
                <SC.Link href={ADMIN_GUI_BASE_URI}>Høste data</SC.Link>
              </li>
              <li>
                <SC.Link href='/publishing/terms-of-use'>Bruksvilkår</SC.Link>
              </li>
              <li>
                <SC.Link href='/' target='_self' external>
                  Søk i Felles datakatalog
                </SC.Link>
              </li>
            </SC.Menu>
          </Menu>
        </SC.DropdownMenu>
      </SC.Row>
    </SC.Header>
  );
};

export default compose<FC>(memo)(Header);
