import React, { Component } from 'react';
//import logo from './logo.svg';
import '../assets/css/App.css';
//import {Map} from 'Immutable';
import NavigationBar from './NavigationBar';

class App extends Component {
  render() {
    return (
     
        <div className="Nav">
          <NavigationBar />
          
        </div>
    );

  }
}

export default App;
