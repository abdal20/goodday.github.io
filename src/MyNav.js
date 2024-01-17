import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Quotes.css';

function MyNav() {
  return (
    <>

<Navbar bg="navbar-custom" variant="dark" className="navbar-custom">
        <Container>
          <Navbar.Brand href="/">GoodDay Quotes </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/edit">Edit</Nav.Link>
            <Nav.Link href="/add">Add</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    
    </>
  );
}

export default MyNav;