import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import AuthVerify from "./components/Common/AuthVerify";
import AuthService from "./services/authentification.service";
function App() {
	return (
		<AuthProvider>
			<div className="App h-screen">
				<Header />
				<Outlet />
				<Footer />
			</div>
			<AuthVerify logOut={AuthService.logout} />
		</AuthProvider>
	);
}

export default App;
