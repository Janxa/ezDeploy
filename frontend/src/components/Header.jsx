import { useState } from "react";
import Menu from "./Menu";
function Header() {
    const [visible,setVisible] = useState(false)
    return (
    <header className="flex justify-between py-4 px-5 h-16 md:px-16 shadow-md sticky overflow-visible">
        <h1 className="text-color-yellow-primary font-bold text-2xl  ">EZ hosting</h1>

        <button onClick={() => setVisible(!visible)} className="group w-9 h-full self-center items-end flex flex-col justify-between md:hidden">
            <div className="bg-white w-full h-[13%] group-hover:w-4/5 transition-all"></div>
            <div className="bg-white w-full h-[13%] group-hover:w-2/3 transition-all"></div>
            <div className="bg-white w-full h-[13%] group-hover:w-4/5 transition-all"></div>
        </button>
        <Menu visible={visible} setVisible={setVisible}/>

    </header>
     );
}

export default Header;