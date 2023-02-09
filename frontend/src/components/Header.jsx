function Header() {
    return ( <header className="flex justify-between py-5 px-5 h-16 md:px-16 shadow-md">
        <p className="text-color-yellow-primary font-bold text-2xl self-center ">EZ hosting</p>

        <button onClick='' className="group w-9 h-full self-center items-end flex flex-col justify-between md:hidden">
            <div className="bg-white w-full h-[13%] group-hover:w-4/5 transition-all"></div>
            <div className="bg-white w-full h-[13%] group-hover:w-2/3 transition-all"></div>
            <div className="bg-white w-full h-[13%] group-hover:w-4/5 transition-all"></div>
        </button>

        <ul className="hidden md:flex w-2/3 justify-between  text-white font-medium">
            <li>placeholder</li>
            <li>placeholder</li>
            <div className="flex  w-1/3 justify-around">
              <button className="px-2 mr-2">Login</button>
              <button className="bg-color-blue-primary rounded-full px-3">Register</button>
            </div>
        </ul>
    </header>
     );
}

export default Header;