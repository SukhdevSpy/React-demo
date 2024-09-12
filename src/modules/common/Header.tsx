import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { appState, getProfileAsync } from '../../stores/appSlice';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Header = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#">Navbar</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Link to="/signin" className='nav-link'>Signin Now</Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

const SecureHeader = () => {

    const navigate = useNavigate();
    const dispatchApp = useAppDispatch();
    const { profile, isAuthenticated } = useAppSelector(appState);

    useEffect(()=>{
        dispatchApp(getProfileAsync());
    },[isAuthenticated && !profile])

    useEffect(()=>{
        if(profile?.name == 'TokenExpiredError'){
            alert(profile.message);
            Cookies.remove('authToken');
            navigate('/signin');
        }
    },[profile])

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link className='nav-link' to="/" >Home</Link>
                        <Link className='nav-link' to="/products">Products</Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a href="#login">{profile?.data?.username}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
export { Header, SecureHeader };