import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';



class Home extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      name: '',
      redirect: false,
      products: [],
      email: '',
      url: '',
    };
  }
  componentDidMount() {
    let data = JSON.parse(sessionStorage.getItem('userData'));
    this.setState({ name: data.name })
    this.setState({ email: data.email })
    this.setState({ url: data.picture.data.url })
  }
  logout(response) {
  //  $.cookie('c_user', '', -1, '/', '.facebook.com');
    sessionStorage.removeItem('userData');

  };
  render() {
    if (!sessionStorage.getItem('userData') || this.state.redirect) {
      return (<Redirect to={'/'} />)
    }
    return (
      <div className="container">
        <div className="WelcomePage">

          Image :
    &nbsp;&nbsp; <img src={this.state.url}  alt=""></img>
          <br></br>
          Welcome :- {this.state.name} !!
      <br></br>
          Your Email Id is :- {this.state.email}
          <div className="omb_login ">
          <div className="row omb_row-sm-offset-3 omb_socialButtons">
    	    <div className="col-xs-4 col-sm-2 logout">
		        <a href="/" className="btn btn-lg btn-block omb_btn-facebook" onClick={this.logout}>
			        <i className="fa fa-facebook visible-xs"></i>
              <div className="logout">
			        <span className="hidden-xs">Logout</span>
              </div>
		        </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;