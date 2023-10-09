import { Fragment, useState, useEffect } from "react";
import { useNavigate, Link, NavLink, Navigate } from "react-router-dom";
import { Dialog, Menu, Transition, Combobox } from "@headlessui/react";
import { ChevronDownIcon, TagIcon } from "@heroicons/react/20/solid";
import { ToastContainer } from "react-toast";
import { FiSend, FiTarget } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import { MdOutlineClass, MdDomainVerification } from "react-icons/md";
import { supabase } from "../supabase";
import { useAuth } from "../contexts/Auth";
import searchRoute from "../searchRoute";
import { AiOutlineTag, AiOutlineMedicineBox } from "react-icons/ai";
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from "react-redux";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  tagIcon,
  UsersIcon,
  XMarkIcon,
  UserGroupIcon,
  MapPinIcon,
  UserIcon,
  InformationCircleIcon,
  AdjustmentsHorizontalIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentIcon,
  RocketLaunchIcon,
  HandThumbUpIcon,
  UserPlusIcon,
  BriefcaseIcon,
  MegaphoneIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const Menus = [
  { name: "Dashboard", href: "/", icon: UsersIcon, current: true },
  { name: "Category", href: "/category", icon: MapPinIcon, current: false },
  { name: "SubCategory", href:"/subCategory", icon: TagIcon, current:false},
  { name: "Author", href:"/author", icon: UserIcon, current:false},
  { name: "Game", href: "/game", icon: ClipboardDocumentIcon, current: false },
  { name: "Settings", href: "/settings", icon: HandThumbUpIcon, current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DashboardLayout = ({ children }) => {

  //const router = useRouter();
  const [scrollBg, setScrollBg] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchModal, setSearchModal] = useState(false);
  const [submenuOpen, setsubmenuOpen] = useState({
    appointment: false,
    forms: false,
    master: false,
  });

  const handleProfile = () => {
    console.log("ajay");
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const userNavigation = [
    { name: "Settings", href: "/settings", onclick: handleProfile, click: false },
    { name: "Logout", href: "#", onclick: onLogout, click: true },
  ];

  useEffect(() => {}, []);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate 20% of the screen height
      const twentyPercent = window.innerHeight * 0.03;

      // Check if the current scroll position is greater than 20% of the screen height
      if (window.scrollY > twentyPercent) {
        setScrollBg(false); // Remove background
      } else {
        setScrollBg(true); // Add background
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredMenus =
    query === ""
      ? []
      : searchRoute.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <ToastContainer delay={3000} position="bottom-right" />
      <div className="bg-gray-100">

        {/* Sidebar Menus */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col pt-5 pb-4 -- m-3 rounded-lg bg-gradient-to-b from-[#2e2e34] from-10%   via-gray-900 via-10%    to-gray-900 to-80%">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                      alt="Your Company"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {Menus.map((menu, index) => (
                        <span key={index}>
                          <NavLink
                            key={index}
                            to={menu.href}
                            className={classNames(
                              window.location.pathname === menu.href
                                ? "bg-gradient-to-b from-[#49a3f1] to-[#1a73e8] text-white shadow-md"
                                : "text-gray-100 hover:bg-gray-600",
                              "group flex items-center px-2 py-3 my-2 mx-1 font-medium rounded-md"
                            )}
                          >
                            <menu.icon
                              className="mr-3 h-6 w-6 flex-shrink-0 text-white"
                              aria-hidden="true"
                            />
                            {menu.name}
                            {menu.submenu && (
                              <ChevronDownIcon
                                className={` ${
                                  submenuOpen && "-rotate-0"
                                }  mr-3 h-6 w-6 flex-shrink-0 -rotate-90 text-white duration-150`}
                                aria-hidden="true"
                              />
                            )}
                          </NavLink>
                          {menu.submenu && (
                            <div>
                              {menu.submenuItems.map((submenuItem, index) => (
                                <Link
                                  key={index}
                                  to={submenuItem.href}
                                  className={classNames(
                                    menu.current
                                      ? "bg-indigo-800 text-white"
                                      : "text-indigo-100 hover:bg-indigo-600",
                                    "group flex items-center  px-2 py-2 text-xs font-normal rounded-md"
                                  )}
                                >
                                  <submenuItem.icon
                                    className="ml-5 mr-3 h-5 w-6 flex-shrink-0 text-indigo-300"
                                    aria-hidden="true"
                                  />
                                  {submenuItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </span>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto m-3 rounded-lg bg-gradient-to-b from-[#2e2e34] from-10%   via-gray-900 via-10%    to-gray-900 to-80% pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png"
                alt="MaQueenSoft"
              />
              <h1 className="ml-2 items-center text-center text-white">ReactJs</h1>
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {Menus.map((menu, index) => (
                  <span key={index}>
                    <Link
                      key={index}
                      to={menu.href}
                      onClick={() => {
                        setsubmenuOpen({
                          ...submenuOpen,
                          [menu.name.toLowerCase()]:
                            !submenuOpen[menu.name.toLowerCase()],
                        });
                      }}
                      className={classNames(
                        window.location.pathname === menu.href
                          ? "bg-gradient-to-b from-[#49a3f1] to-[#1a73e8] text-white shadow-md"
                          : "text-gray-100 hover:bg-gray-600",
                        "group flex items-center px-2 py-3 my-2 mx-1 font-medium rounded-md"
                      )}
                    >
                      <menu.icon
                        className="mr-3 h-6 w-6 flex-shrink-0 text-white"
                        aria-hidden="true"
                      />
                      {menu.name}
                      {menu.submenu && (
                        <ChevronDownIcon
                          className={` ${
                            submenuOpen && "-rotate-0"
                          }  mr-3 h-6 w-6 flex-shrink-0 -rotate-90 text-gray-300 duration-150`}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                    {menu.submenu && submenuOpen[menu.name.toLowerCase()] && (
                      <div>
                        {submenuOpen &&
                          menu.submenuItems.map((submenuItem, index) => (
                            <Link
                              to={submenuItem.href}
                              className={classNames(
                                window.location.pathname === submenuItem.href
                                  ? "bg-indigo-800 text-white"
                                  : "text-indigo-100 hover:bg-indigo-600",
                                "group flex items-center px-2 py-2 font-medium rounded-md"
                              )}
                              key={index}
                            >
                              <submenuItem.icon
                                className="ml-5 mr-3 h-5 w-6 flex-shrink-0 text-indigo-300"
                                aria-hidden="true"
                              />
                              {submenuItem.name}
                            </Link>
                          ))}
                      </div>
                    )}
                  </span>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="flex flex-1 flex-col md:pl-64 min-h-screen">

          {/* Header */}
          <div className={`sticky top-0 z-10 flex h-16 flex-shrink-0 shadow rounded-lg m-3 backdrop-blur-md ${scrollBg ? 'bg-white' : ''}`}>
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">

              {/* Left Menus */}
              <div className="flex flex-1 items-center">
                <div className="w-8">

                  <Tooltip title="Search Menus" arrow>
                      <MagnifyingGlassIcon
                          size={18}
                          className="cursor-pointer"
                          onClick={() => setSearchModal(true)}
                        />
                  </Tooltip>

                </div>
                {/* CAN PUT CONTENT HERE INSTEAD OF SEARCH BAR */}
              </div>


              {/* <div className="flex flex-1"> */}
              {/* CAN PUT CONTENT HERE INSTEAD OF SEARCH BAR */}
              {/* </div> */}

              {/* Right Menus */}
              <div className="ml-4 flex items-center md:ml-6">
                {/* Here we aca add more menus */}

                {/* Profile dropdown */}
                <div className="text-end leading-none">
                    <p>Ajay Chauhan</p>
                    <span className="text-xs text-gray-500">(Admin)</span>
                </div>
                <Tooltip title="Profile Menus" arrow>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item, key) => (
                        <Menu.Item key={key}>
                          {({ active }) => (
                            <Link
                              key={key}
                              onClick={item.click ? item.onclick : null}
                              to={item.click ? null : item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                </Tooltip>
              </div>
            </div>
          </div>

          <main>
            <div className="py-6">
              <div className="mx-auto max-w-[90rem] overflow-x-hidden px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>

          {/* Search Modal */}
          <Transition.Root
            show={searchModal}
            as={Fragment}
            afterLeave={() => setQuery("")}
            appear
          >
            <Dialog as="div" className="relative z-10" onClose={setSearchModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-900 backdrop-blur-sm bg-opacity-25 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                    <Combobox
                      onChange={(person) => (window.location = person.url)}
                    >
                      <div className="relative">
                        <MagnifyingGlassIcon
                          className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <Combobox.Input
                          className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                          placeholder="Search..."
                          onChange={(event) => setQuery(event.target.value)}
                        />
                      </div>

                      {filteredMenus.length > 0 && (
                        <Combobox.Options
                          static
                          className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                        >
                          {filteredMenus.map((person, key) => (
                            <Combobox.Option
                              key={key}
                              value={person}
                              className={({ active }) =>
                                classNames(
                                  "cursor-pointer select-none px-4 py-2",
                                  active && "bg-indigo-600 text-white"
                                )
                              }
                            >
                              {person.name}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      )}

                      {query !== "" && filteredMenus.length === 0 && (
                        <p className="p-4 text-sm text-gray-500">
                          No menus found.
                        </p>
                      )}
                    </Combobox>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
