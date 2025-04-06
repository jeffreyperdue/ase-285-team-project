import Header from './components/Header';
import SignInUp from './components/auth/SignInUp';
import SetUp from './components/setup/SetUp';
import MenuDashboard from './components/menu/MenuDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />

      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={ SignInUp() } />
            
            <Route path="/step1" element={ <SetUp step={ 1 } /> } />
            <Route path="/step2" element={ <SetUp step={ 2 } /> } />
            <Route path="/step3" element={ <SetUp step={ 3 } /> } />
            <Route path="/dashboard" element={<MenuDashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
