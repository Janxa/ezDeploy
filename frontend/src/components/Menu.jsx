import { Link } from "react-router-dom";
function Menu({visible}) {
    return (
    <div className={visible
        ? 'flex flex-col items-center absolute top-20 left-0 w-full h-screen z-50 md:flex md:w-2/3 md:justify-between text-white md:font-medium md:static md:h-full '
        : 'hidden md:flex md:w-2/3 md:justify-between  md:text-white md:font-medium '}>
        <ul className=" flex flex-col md:items-center md:flex-row-reverse md:justify-between w-3/4 md:w-full">
            <li className="flex mb-4 md:mb-0  basis-1/4 w-1/2 md:w-auto justify-around self-center">
                <Link className="p-2 mx-1 rounded-md bg-color-blue-primary"
                to="/account" state={{disp:'login'}}
                >
                    Login
                </Link>
                <Link className="p-2 mx-1 rounded-md bg-color-blue-primary"
                to="/account" state={{disp:'register'}}
                >
                    Register
                </Link>
            </ li>
            <li>PlaceHolder</li>
            <li>PlaceHolder</li>
            <li>PlaceHolder</li>
        </ul>
    </div>
    );
}

export default Menu;