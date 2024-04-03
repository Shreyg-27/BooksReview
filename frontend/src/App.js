import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Thankyou from "./components/Thankyou";

function App() {


  return (
    <Router>
        <div className="App">
        <Routes>
              <Route exact path="/" Component={Home} />
              <Route exact path="/login" Component={Login} />
              <Route exact path="/signup" Component={Signup} />
              <Route exact path="/profile" Component={Profile} />
              <Route exact path="/thankyou" Component={Thankyou} />
        </Routes>
        </div>
    </Router>
    
  );
}

export default App;
