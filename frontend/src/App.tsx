import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import Login from './components/Login';
import Events from './components/Events';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import Register from './components/Register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/events" element={<Events />} />
          {/* <Route path="/partido/:partidoId" element={<MatchDetails /> }/> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
