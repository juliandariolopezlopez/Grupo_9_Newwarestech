import logo from './logo.svg';
import './App.css';
import './Static/css/index.css';
import React from 'react'; 
import { Router, Switch } from 'react-router-dom';
import Product from './Componentes/product';
import User from './Componentes/user';


function App() {
  return (
    <>
    <Switch>
      <Router path= "/user" exact= {true} />
      <Router path= "/product" exact= {true} />
      <Router path= "*" exact= {true} >
        <h1> ¡Error 404! </h1>
      </Router>
    </Switch>
    </> 
     );
}

export default App;


