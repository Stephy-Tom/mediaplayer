import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
        <Navbar className="bg-body-teritary bg-dark">
      <Container>
        <Navbar.Brand >
          <Link to ='/' style={{textDecoration:"none",color:"white",fontSize:"25px"}}>
            <i className="fa-solid fa-video text-warning me-4"></i>Media Player</Link>
          </Navbar.Brand>
        <Navbar.Toggle />
       
      </Container>
    </Navbar>
    </div>
  )
}

export default Header