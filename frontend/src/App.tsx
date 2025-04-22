import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/layout";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import 'bootstrap-icons/font/bootstrap-icons.css';

import FindADermatologist from "./pages/FindADermatologist";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/how-it-works" element={<HowItWorks />} />
					<Route
						path="/find-a-dermatologist"
						element={<FindADermatologist />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
