import React from 'react'
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HeaderTop from './Components/HeaderTop';
import HeaderMiddle from './Components/HeaderMiddle';
import HeaderThree from './Components/HeaderThree';

export const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#CE5A67',
    },
    secondary: {
      main: '#F4BF96',
    },
  },
};


const App = () => {
  return (
    <>
      <HeaderTop />
      <HeaderMiddle />
      <HeaderThree />
        <main className='pt-3'>
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer />
        <ToastContainer />
    </>
  )
}

export default App