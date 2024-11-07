const AppHeader = () => {

  return (
    <>
       <nav className="bg-[#ffffff] justify-between px-4 py-3 text-gray-700 border border-gray-200 rounded-lg sm:flex sm:px-16 dark:border-gray-700" aria-label="Breadcrumb">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="assets/logo.png" className="h-12" alt="Logo" />
              <div className="flex flex-col">
                  <span className="self-start text-xl font-bold whitespace-nowrap dark:text-white">TrackIt</span>
                  <span className="self-start text-sm font-medium whitespace-nowrap dark:text-white">Stay on Track with Every Transaction</span>
              </div>
          </a>
          <div id="mega-menu" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          </div>
        </nav>
    </>
  );
};

export default AppHeader;
