import React from 'react';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './index.css'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

const App = () => {
  return (
    <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} /> 
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route exact path='/' component={HomeScreen} />
          </Container>
          </main>
        <Footer />
    </Router>
  );
}

export default App;