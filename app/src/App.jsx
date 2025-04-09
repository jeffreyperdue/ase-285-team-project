import Header from './components/Header';
import SignInUp from './components/auth/SignInUp';
import SetUp from './components/setup/SetUp';
import MenuDashboard from './components/menu/MenuDashboard';
import CreateRestaurant from './components/restaurant/CreateRestaurant';
import ChangeLoginInfo from './components/auth/ChangeLoginInfo';
import FilterPanel from './components/menu/FilterPanel';
import AddMenuItemForm from './components/menuitems/AddMenuItem';
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';
import Admin from './components/admin/Admin';

function App() {
	return (
		<>
			<Router>
				<Header />

				<div className='content'>
					<Routes>
						<Route
							path='/'
							element={SignInUp()}
						/>

						<Route
							path='/step1'
							element={<SetUp step={1} />}
						/>
						<Route
							path='/step2'
							element={<SetUp step={2} />}
						/>
						<Route
							path='/step3'
							element={<SetUp step={3} />}
						/>

						<Route
							path='/changeLogin'
							element={<ChangeLoginInfo />}
						/>

						<Route
							path='/admin'
							element={<Admin />}
						/>
						<Route
							path='/dashboard'
							element={<MenuDashboard />}
						/>
						<Route
							path='/create-restaurant'
							element={<CreateRestaurant />}
						/>
						<Route
							path='/test'
							element={<FilterPanel />}
						/>
						<Route
							path='/test2'
							element={<AddMenuItemForm />}
						/>
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
