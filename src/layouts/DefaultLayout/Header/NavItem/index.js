import React from 'react';
import { NavLink } from 'react-router-dom';

function NavItem({
  invertColor = false,
  to = '',
  title = '',
  highlight = false,
}) {
  return (
    <li className="px-3 pt-3">
      <NavLink
        to={to}
        className={({ isActive }) =>
          'after:select-border after:border-white ' +
          (isActive
            ? 'after:select-border after:select-border-hover '
            : 'hover:after:select-border-hover ') +
          (highlight
            ? ' text-secondary after:!border-b-secondary group-hover:after:!border-b-secondary '
            : ' ') +
              (invertColor
                ? 'after:!border-b-black'
                : 'group-hover:after:!border-b-black')
        }
      >
        {title}
      </NavLink>
    </li>
  );
}

export default NavItem;
