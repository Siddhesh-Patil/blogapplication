import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #2823f0;
    color:#FFF;
    font-size:18px;
    font-weight:600;

`

const Container = styled(Toolbar)`
    justify-content: center;
    & > a{
          color: white;
          display: block;
          padding: 3px 22px;
          border-radius: 20px;
          text-decoration: none;
          font-size: 1.2rem;
          text-transform: uppercase;
          font-weight: 600;
    }
    & > a: hover{
        background-color: white;
        color:black;
        border-radius:10px;
    }
`
const Header = () => {
    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/login'>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;