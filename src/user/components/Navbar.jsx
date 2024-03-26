import { memo, useEffect } from "react";
import { NavLink } from "react-router-dom";

function NavbarEL() {
  const routes = [
    {
      name: "Home",
      route: "",
    },
    {
      name: "Login",
      route: "login",
    },
  ];
  useEffect(() => {
    // init
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://scontent.fsxr1-2.fna.fbcdn.net/v/t1.6435-9/120092689_114052640454023_3590867817532297551_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2MDuUtePFzQAX8TxdkD&_nc_ht=scontent.fsxr1-2.fna&oh=00_AfA3TD5oDVnFpH508ARU4VwNnYDmyta8kYo0igbhyEXdvw&oe=6624E431"
            className="h-16 w-16 object-cover"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            IQC
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {routes &&
              routes.map((_, i) => {
                return (
                  <li key={i}>
                    <NavLink
                      to={_.route}
                      className={({ isActive }) =>
                        `block py-2 px-3 ${
                          isActive ? "text-blue-900" : "text-gray-500"
                        }  rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-900`
                      }
                      aria-current="page"
                    >
                      {_.name}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

const Navbar = memo(NavbarEL);
export default Navbar;
