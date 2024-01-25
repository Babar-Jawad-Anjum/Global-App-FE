import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

export default function Example() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("CCode");
    localStorage.removeItem("UserId");
    navigate("/login");
  };

  return (
    <header className="bg-gray-100 fixed top-0 w-full z-10 shadow-lg">
      <nav
        className="mx-auto flex items-center justify-between px-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-20 w-20" src="/logo.png" alt="" />
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden md:flex md:gap-x-12">
          <Link
            to="/customers"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Customers
          </Link>
          <Link
            to="/suppliers"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Suppliers
          </Link>
          <Link
            to="/stocks"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Stocks
          </Link>
          <Link
            to="/banks"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Banks
          </Link>
        </Popover.Group>
        <div className="hidden md:flex md:flex-1 md:justify-end">
          <div
            onClick={handleLogout}
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            LogOut <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <Dialog
          as="div"
          className="md:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <img className="h-20 w-20" src="/logo.png" alt="" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root text-center font-semibold">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/customers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Customers
                  </Link>
                  <Link
                    to="/suppliers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Suppliers
                  </Link>
                  <Link
                    to="/stocks"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Stocks
                  </Link>
                  <Link
                    to="/banks"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Banks
                  </Link>
                </div>
                <div className="py-6">
                  <div
                    onClick={() => handleLogout()}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </header>
  );
}
