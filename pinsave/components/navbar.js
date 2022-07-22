import { Disclosure, Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import { SkynetClient } from "skynet-js";

const portal = "https://siasky.net";
const client = new SkynetClient(portal);

const navigation = [
  { name: "Home", href: "/" },
  { name: "Upload", href: "/upload" },
];

const Navbar = () => {
  const { state, dispatch } = useAppContext();

  const { id } = state;

  const ConnectWallet = async (client) => {
    const dataDomain = "localhost";

    const mySky = await client.loadMySky(dataDomain);
    await mySky.requestLoginAccess();

    const _id = await mySky.userID();

    dispatch({ type: "add_id", value: _id });
  };

  return (
    <Disclosure as="nav" className="bg-emerald-600">
      {({ open }) => (
        <>
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            aria-label="Top"
          >
            <div className="flex w-full items-center justify-between border-b border-indigo-500 py-4">
              <div className="flex items-center">
                <div className="-ml-2 mr-2 space-x-8 flex items-center md:hidden">
                  {/* Mobile menu */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="/assets/images/PinSaveL.png"
                      alt="Pin Save"
                    />
                  </Link>
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="/assets/images/PinSave.png"
                    alt="Pin Save"
                  />
                </div>

                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-base text-gray-300 hover:text-white  hover:text-indigo px-3 py-2 rounded-md text-sm font-medium"
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <div className="ml-10 space-x-4">
                  {!state.id ? (
                    <button
                      onClick={() => ConnectWallet(client)}
                      type="button"
                      className="text-base relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-550"
                    >
                      Connect
                    </button>
                  ) : (
                    <Menu>
                      <Menu.Button className="text-base inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        {id.substring(0, 9)}
                      </Menu.Button>
                    </Menu>
                  )}
                  <a className="text-base relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-550">
                    Wallet
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="text-base px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
