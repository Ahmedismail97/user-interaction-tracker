import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Auth from './components/Auth';
import Tracker from './components/Tracker';
import Dashboard from './components/Dashboard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-center mb-4">User Interaction Tracker</h1>
        <nav className="mb-4">
          {user && <Link to="/" className="mr-4 text-blue-500">Home</Link>}
          {user && <Link to="/dashboard" className="text-blue-500">Dashboard</Link>}
        </nav>
        <Routes>
          <Route path="/" element={<div><Auth />{user && <Tracker />}</div>} />
          {user && <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
