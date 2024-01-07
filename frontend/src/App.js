import React from 'react'
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen';

const App = () => {
  return (
    <>
      <Header />
        <main className='py-3'>
          <Container>
            <h1>Welcome to Tech Shop</h1>
            <HomeScreen />
          </Container>
        </main>
        <Footer />
    </>
  )
}

export default App