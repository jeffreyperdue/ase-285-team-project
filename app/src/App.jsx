import Header from './components/Header';
import SignInUp from './components/auth/SignInUp';
import SetUp from './components/auth/SetUp';
import SetUp1 from './components/auth/SetUp1';
import SetUp2 from './components/auth/SetUp2';
import SetUp3 from './components/auth/SetUp3';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />

      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={ SignInUp() } />
            
            <Route path="/setUp" element={ <SetUp /> } />
            <Route path="/setUp1" element={ <SetUp1 /> } />
            <Route path="/setUp2" element={ <SetUp2 /> } />
            <Route path="/setUp3" element={ <SetUp3 /> } />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
