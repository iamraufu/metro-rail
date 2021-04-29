import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
      const logo = 'https://i.ibb.co/dMys5VV/mr.png'
      const [loggedInUser, setLoggedInUser] = useContext(UserContext)

      return (
            <Navbar collapseOnSelect expand="lg" bg="" variant="light">
                  <Navbar.Brand href="/home"><img className='header-content' src={logo} alt="" /></Navbar.Brand>
                              <h2 style={{color:'goldenrod'}}>Welcome To Dhaka Metro Rail Corporation</h2>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav toggler">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav>
                              <Link to="/home" className="link">Home</Link>
                              <Link to="/destination" className="link">Destination</Link>
                              <Link to="/blog" className="link">Blog</Link>
                              <Link to="/contact" className="link">Contact</Link>
                              {
                                    <Link eventKey={2} to="/login" className="link login">Login</Link>}
                        </Nav>
                  </Navbar.Collapse>
            </Navbar>
      );
};

export default Header;