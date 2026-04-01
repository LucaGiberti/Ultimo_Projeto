import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateRequest from './pages/CreateRequest';
import Requests from './pages/Requests';
import AnswerRequest from './pages/AnswerRequest';
import EditRequest from './pages/EditRequest';
import Notifications from './pages/Notifications';
import History from './pages/History';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-request" element={<CreateRequest />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/requests/:id" element={<AnswerRequest />} />
        <Route path="/requests/:id/edit" element={<EditRequest />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
