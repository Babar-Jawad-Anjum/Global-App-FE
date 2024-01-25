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
import { useState } from "react";
import LedgerDetail from "./pages/LedgerDetail";

function App() {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      {location.pathname !== "/login" && <Header />}
      <Routes>
        <Route
          path="/login"
          element={<Login isLoading={isLoading} setIsLoading={setIsLoading} />}
        />
        <Route element={<Auth />}>
          <Route
            path="/"
            element={
              <HomePage isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          />
          <Route
            path="/customers"
            element={
              <Customers isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          />
          <Route
            path="/suppliers"
            element={
              <Suppliers isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          />
          <Route
            path="/stocks"
            element={
              <Stocks isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          />
          <Route
            path="/banks"
            element={
              <Banks isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          />
          <Route
            path="/details/:Code"
            element={
              <LedgerDetail isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
