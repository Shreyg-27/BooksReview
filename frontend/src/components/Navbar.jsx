import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">BooksReview</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/allposts">Read Articles</Nav.Link>
            <Nav.Link href="/allbooks">Books</Nav.Link>
            <Nav.Link href="/quiz">QuestionsFun</Nav.Link>
            <Nav.Link href="/quotes">Quotes</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/createarticle">Create Article</NavDropdown.Item>
              <NavDropdown.Item href="/myPosts">View my Articles</NavDropdown.Item>
              <NavDropdown.Item href="/updateDetails">Update My Details</NavDropdown.Item>
              <NavDropdown.Item href={`/profile/${email}`}>My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item> {/* Logout button */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

