import Header from "./components/Layout/Header/Header";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
function App() {
	return (
		<AuthProvider>
			<div className="App h-screen">
				<Header />
				<Outlet />
			</div>
		</AuthProvider>
	);
}

export default App;
