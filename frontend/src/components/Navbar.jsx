import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

const CustomNavbar = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the user's email from the cookie
    const userEmail = Cookies.get('userEmail');
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const handleLogout = () => {
    // Remove the userEmail cookie
    Cookies.remove('userEmail');
    // Redirect to the login page
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-blue-800 py-6 px-8">
      <Container className="w-screen flex justify-between">
        <Navbar.Brand href="/home" className="text-white font-bold text-3xl">BooksReview</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-white" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/allposts" className="text-white font-bold text-2xl mr-16 ml-16">Read Articles</Nav.Link>
            <Nav.Link href="/allbooks" className="text-white font-bold text-2xl mr-16">Books</Nav.Link>
            <Nav.Link href="/quiz" className="text-white font-bold text-2xl mr-16">QuestionsFun</Nav.Link>
            <Nav.Link href="/quotes" className="text-white font-bold text-2xl mr-16">Quotes</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown" className="text-white font-bold text-2xl">
              <NavDropdown.Item href="/createarticle" className="text-gray-800">Create Article</NavDropdown.Item>
              <NavDropdown.Item href="/myPosts" className="text-gray-800">View my Articles</NavDropdown.Item>
              <NavDropdown.Item href="/updateDetails" className="text-gray-800">Update My Details</NavDropdown.Item>
              <NavDropdown.Item href={`/profile/${email}`} className="text-gray-800">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-gray-800">Logout</NavDropdown.Item> {/* Logout button */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
