function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">FlyHigh Agency</div>

        <ul className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <li className="hover:text-blue-400 cursor-pointer">Services</li>
            <li className="hover:text-blue-400 cursor-pointer">Destinations</li>
            <li className="hover:text-blue-400 cursor-pointer">Deals</li>
            <li className="hover:text-blue-400 cursor-pointer">Contact</li>
          </ul>

          {/* Log In & Sign Up */}
          <div className="flex items-center space-x-3">
            <button className="bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-blue-200 hover:text-gray-900 transition-colors">
              Log In
            </button>
            <button className="bg-blue-500 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-200 transition-colors">
              Sign Up
            </button>
          </div>
       
      </div>
    </header>
  );
}

export default Header;
