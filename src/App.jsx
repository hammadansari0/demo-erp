import { Routes, Route, useLocation } from 'react-router-dom';
import LoginCard from './components/Login/LoginCard';
import RegisterCard from './components/Register/RegisterCard';
import UserCard from './components/UserCard/UserCard';
import Structure from './components/Structure/Structure';

function App() {
  const location = useLocation();

  // user and token passed through location.state
  const user = location.state?.user || null;
  const token = location.state?.token || null;

  return (
    <Routes>
      <Route path="/login" element={<LoginCard />} />
      <Route path="/register" element={<RegisterCard />} />

      {/* Home shows UserCard if logged in else Login */}
      <Route path="/" element={user && token ? <UserCard user={user} token={token} /> : <LoginCard />} />

      {/* Structure page - must be logged in (token passed) */}
      <Route path="/structure" element={token && user ? <Structure user={user} token={token} /> : <LoginCard />} />
    </Routes>
  );
}

export default App;
