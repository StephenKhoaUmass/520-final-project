import {
  BrowserRouter, Routes,
  Route
} from "react-router-dom"

import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Reservations from "./pages/Reservations";
import Confirmation from "./pages/Confirmation"

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/userRegister" element={<Register type="user" />} />
              <Route path= "/confirmation" element = {<Confirmation />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
