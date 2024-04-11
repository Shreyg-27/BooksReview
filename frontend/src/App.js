import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Thankyou from "./components/Thankyou";
import ReadMyArticles from "./components/ReadMyArticles";
import CustomNavbar from "./components/Navbar";
import ReadAllPosts from "./components/ReadAllPosts";
import CreateArticle from "./components/CreateArticle";
import Update from "./components/UpdateUserDetails";

function App() {
  const [email, setEmail] = useState(""); // State to hold the email  

  // Function to update the email state
  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/login" element={<Login />}  />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/profile/:email" element={<Profile />} />
          <Route exact path="/thankyou" element={<Thankyou />} />
          <Route exact path="/myposts" element={<ReadMyArticles />} />
          <Route exact path="/allposts" element={<ReadAllPosts />} />
          <Route exact path="/createarticle" element={<CreateArticle/>} />
          <Route exact path = "/updateDetails" element={<Update />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

