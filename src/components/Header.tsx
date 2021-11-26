import React, { useContext, useState } from 'react'
import { SidebarContext } from 'src/context/SidebarContext'
import {
  MenuIcon,
  OutlineLogoutIcon,
} from '../icons'
import { Avatar, Dropdown, DropdownItem } from '@windmill/react-ui'
import { useAppDispatch  } from 'src/config/store'
import { logout } from 'src/reducers/authentication.reducer'

import PersonImage from 'src/assets/images/person.png';

function Header() {
  const { toggleSidebar } = useContext(SidebarContext)
  const dispatch = useAppDispatch();
  
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  function handleLogout () {
      dispatch(logout());
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        
        <ul className="items-end flex justify-end flex-1 lg:mr-16">
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src={PersonImage}
                alt="mosaic"
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem onClick={handleLogout}>
                <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header