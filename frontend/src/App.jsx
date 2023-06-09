import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "./context/AuthProvider";
import AuthVerify from "./components/Common/AuthVerify";
import AuthService from "./services/authentification.service";
function App() {
	return (
		<AuthContextProvider>
			<div className="App h-screen">
				<Header />
				<Outlet />
				<Footer />
			</div>
			<AuthVerify logOut={AuthService.logout} />
		</AuthContextProvider>
	);
}

export default App;
