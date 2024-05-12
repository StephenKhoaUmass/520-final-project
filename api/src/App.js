import {
  BrowserRouter, Routes,
  Route, Navigate
} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./authContext";
import AdminLanding from "./pages/AdminLanding"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Reservations from "./pages/Reservations";

function App() {

  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children, redirectTo }) => {
      if (!user || user.isAdmin) {
          return <Navigate to={redirectTo} />;
      } else {
          return children;
      }
  };

  const AdminProtectedRoute = ({ children, redirectTo }) => {
      if (!user || !user.isAdmin) {
          return <Navigate to={redirectTo} />;
      } else {
          return children;
      }
  };
//              <Route path="/adminLogin" element={<Login type="admin" />} />
//              <Route path="/adminRegister" element={<Register type="admin" />} />
//              <Route path="/userLogin" element={<Login type="user" />} />
//              <Route path="/admin/dashboard" element={
//                  <AdminProtectedRoute redirectTo="/adminLogin">
//                      <AdminLanding />
//                  </AdminProtectedRoute>
//              } />
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/userRegister" element={<Register type="user" />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
