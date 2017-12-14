import React from "react";
import { Route } from "react-router-dom";

import Home from './components/Home';
import App from './components/App.js';
import Greetings from './components/Greetings.js'
import { BrowserRouter } from "react-router-dom";
import {Switch} from 'react-router';
import Searchbar  from "./components/Searchbar";
import Contactus  from "./components/Contactus";
import Signup  from "./components/Signup";
import Login  from "./components/Login";
import FeedbackComponent from './components/FeedbackComponent';
import Favourites from './components/Favourites'

const Routes = () => (
    <BrowserRouter>
    <div>
      <App />
      <Switch>
            <Route exact path="/"  component={Greetings}/>
            <Route path="/services" component={Searchbar} />
            <Route path="/contactus" component={Contactus} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home}/>
            <Route exact path='/feedback' component={FeedbackComponent} />
            <Route path="/favourites" component={Favourites}/>
          </Switch>
        </div>
    </BrowserRouter>
  )

  export default Routes;