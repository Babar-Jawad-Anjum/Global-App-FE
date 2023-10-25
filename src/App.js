import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import Stocks from "./pages/Stocks";
import Banks from "./pages/Banks";
import Login from "./pages/Login";
import Auth from "./auth/Auth";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Auth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/banks" element={<Banks />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
