import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <div>
      {!authenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <Dashboard />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
