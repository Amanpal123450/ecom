import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Product', href: '/products', current: false },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact Us', href: '/contact', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ toggle }) {
  const [img, setImg] = useState();

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://ecom-12-616h.onrender.com/getdata`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) return;

      const data = await response.json();
      if (data.profilePhoto) {
        const res = await fetch(`https://ecom-12-616h.onrender.com/get/uploads/${data.profilePhoto}`);
        if (!res.ok) return;

        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImg(imageUrl);
      }
    }
    getUserData();
  }, []);

  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
                  {open ? (
                    <XMarkIcon className="block size-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block size-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Navigation Links (Desktop) */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:bg-indigo-600 hover:text-white',
                          'rounded-lg px-4 py-2 text-md font-semibold transition duration-300 ease-in-out'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Icons: Cart, Wishlist, Profile */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
                {/* Cart Button */}
                <Link to="/cart" className="relative rounded-full bg-gray-800 p-2 text-gray-300 hover:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                  <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                </Link>
                
                {/* Wishlist Button */}
                <Link to="/wishlist" className="relative ml-4 rounded-full bg-gray-800 p-2 text-gray-300 hover:text-red-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                  <FontAwesomeIcon icon={faHeart} className="text-xl" />
                </Link>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                    <img alt="Profile" src={img} className="size-10 rounded-full border-2 border-indigo-500" />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <MenuItem>
                      <Link to="/profile" className="block px-4 py-2 text-md text-gray-700 hover:bg-indigo-100">Your Profile</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/setting" className="block px-4 py-2 text-md text-gray-700 hover:bg-indigo-100">Settings</Link>
                    </MenuItem>
                    <MenuItem>
                      {toggle ? (
                        <button className="block px-4 py-2 text-md text-gray-700 hover:bg-indigo-100">Logout</button>
                      ) : (
                        <Link to="/login" className="block px-4 py-2 text-md text-gray-700 hover:bg-indigo-100">Login</Link>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:bg-indigo-600 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
