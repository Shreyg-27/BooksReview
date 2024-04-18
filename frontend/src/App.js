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
import UpdatePost from "./components/UpdatePost";
import Books from "./components/BooksNews";
import BooksData from "./components/Books";
import Fantasy from "./components/Fantasy";
import Romance from "./components/Romance";
import Mystery from "./components/Mystery";
import Fiction from "./components/Fiction";
import ScienceFiction from "./components/Scifi";
import Classics from "./components/Classics";
import Adventure from "./components/Adventure";
import Literature from "./components/Literature";
import Quotes from "./components/Quotes";
import Quiz from "./components/Quiz";
import About from "./components/About";

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
          <Route exact path = "/updatepost" element={<UpdatePost />} />
          <Route exact path="/news" element={<Books />} />
          <Route exact path = '/allbooks' element={<BooksData />} />
          <Route exact path="/fantasy" element={<Fantasy />} />
          <Route exact path="/romance" element={<Romance />} />
          <Route exact path="/mystery" element={<Mystery />} />
          <Route exact path="/fiction" element={<Fiction />} />
          <Route exact path="/sciencefiction" element={<ScienceFiction />} />
          <Route exact path="/classics" element={<Classics />} />
          <Route exact path="/adventure" element={<Adventure />} />
          <Route exact path="/literature" element={<Literature />} />
          <Route exact path="/quotes" element={<Quotes />} />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/home" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

