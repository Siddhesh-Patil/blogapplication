import { useState, useContext } from 'react';

import { Box, TextField, Button,Typography, styled } from '@mui/material';

import { API } from '../../services/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.4);
`

const Image = styled('img')({
    width:180,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0'
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    & > div, & > button, & > p{
        margin-top: 20px;

    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #2874f0;
    height:48px;
    border-radius:2px;
`

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color:#2874f0;
    height:48px;
    border-radius:2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`
const Error = styled(Typography)`
    font-size:14px;
    color:#FF6161;
    line-height:0;
    margin-top: 10px;
    font-wieght:600
`

const Text = styled(Typography)`
    color:#878787;
    font-size:16px;
`
const loginInitialValues = {
    username: ' ',
    password: ' '
}

const signupInitialValues = {
    name: ' ',
    username: ' ',
    password: ' '
}
const Login = ({ isUserAutheticated }) => {
    const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBuBTFxRklcOwqNflAouzYzvxa-2sP66EQRA&usqp=CAU';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();
    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({...signup,[e.target.name]: e.target.value});
    } 
    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if(response.isSuccess){
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login')
        } else {
            setError('Something went wrong, please try again');
        }
    }

    
    const onValueChange = (e) => {
        setLogin({ ...login,[e.target.name]: e.target.value });
    }

    const loginUser = async() => {
        let response = await API.userLogin(login);
        if( response.isSuccess ){
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            navigate('/');
            setAccount({username: response.data.username, name: response.data.name })

            isUserAutheticated(true);
        } else {
            setError('Something went wrong, please try again');
        }
    }
    return(
       <Component>
            <Image src={image} alt="login" />
            {
                account === 'login' ?
        
                <Wrapper>
                    <TextField variant="standard"  onChange={(e) => onValueChange(e)} name="username" label="Enter Username"/>
                    <TextField variant="standard"  onChange={(e) => onValueChange(e)} name="password" label="Enter Password"/>

                    { error && <Error>{error}</Error>}

                    <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                    <Text style={{textAlign:'center'}}>OR</Text>
                    <SignupButton onClick={() => toggleSignup()}>Create an Account</SignupButton>
                </Wrapper>
            :
                <Wrapper>
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label="Enter Name"/>
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username'label="Enter Username"/>
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password'label="Enter Password"/>

                    { error && <Error>{error}</Error>}
                    
                    <SignupButton onClick={() => signupUser()}>Sign Up</SignupButton>
                    <Text style={{textAlign:'center'}}>OR</Text>
                    <LoginButton  variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                </Wrapper>
            }

       </Component>
    )
}

export default Login;