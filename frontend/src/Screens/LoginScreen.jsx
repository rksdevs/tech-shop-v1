import { useState, useEffect } from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import FormContainer from '../Components/FormContainer';
import Loader from "../Components/Loader";
import {useLoginMutation} from '../slices/usersApiSlice';
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();

  const { userInfo } = useSelector((state)=> state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(()=>{
    if(userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async(e) =>{
    e.preventDefault();
    try {
      //send login from userApiSlice
      const res = await login({email, password}).unwrap(); //what is unwrap used for - to unwrap a promise as this returns a promise

      //set credentials from auth slice
      dispatch(setCredentials({...res}));
      //navigate to rediect if any
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password Address" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">Sign In</Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
