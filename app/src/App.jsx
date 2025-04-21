import Header from './components/Header';
import SignInUp from './components/auth/SignInUp';
import SetUp from './components/setup/SetUp';
import MenuDashboard from './components/menu/MenuDashboard';
import EditBusinessInfo from './components/restaurant/EditBusinessInfo';
import EditLoginInfo from './components/auth/EditLoginInfo';
// import FilterPanel from './components/menu/FilterPanel';
import AddMenuItem from './components/menuitems/AddMenuItem.jsx';
import MenuItemSwap from './components/menuitems/MenuItemSwap.jsx';
import MenuItemsPage from './components/menuitems/MenuItemsPage.jsx';
import MenuItemPicklist from './components/menuitems/MenuItemPicklist.jsx'

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
							path='/edit-login-info'
							element={<EditLoginInfo />}
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
							path='/edit-business-info'
							element={<EditBusinessInfo />}
						/>
						<Route
							path='/add-menu-item'
							element={<AddMenuItem />}
						/>
						<Route
							path='/swap-menu'
							element={<MenuItemPicklist />}
						/>
						<Route
							path='/menuitems'
							element={<MenuItemsPage />}
						/>
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
