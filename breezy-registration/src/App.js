import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Registration from './pages/Login/Registration';
import RecoveryPass1 from './pages/Login/RecoveryPass1';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/recovery" element={<RecoveryPass1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
