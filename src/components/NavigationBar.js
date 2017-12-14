import React from "react";
import {Nav, NavItem, Navbar} from 'react-bootstrap';
export default () => {
        return( 
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Charter Global</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="/">Home</NavItem>
                    <NavItem eventKey={2} href="/services">Services</NavItem>
                    <NavItem eventKey={4} href="/favourites">Favourites</NavItem>
                    <NavItem eventKey={3} href="/contactus">Contact Us</NavItem>
                    <NavItem eventKey={4} href="/signup">Sign Up</NavItem>
                    <NavItem eventKey={5} href="/login">Login</NavItem>
                    <NavItem eventKey={6} href="/feedback">Feedback</NavItem>
                </Nav>
            </Navbar>
 
        );
}
