import React, { Component } from 'react';
//import logo from './logo.svg';
import '../assets/css/App.css';
//import {Map} from 'Immutable';
import FacebookLogin from 'react-facebook-login';
import { Redirect } from 'react-router-dom';
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginError: false,
			redirect: false
		};
		this.signup = this
			.signup
			.bind(this);
	}

	signup(response) {
		sessionStorage.setItem('userData', JSON.stringify(response));
		this.setState({ redirect: true });

	}
	render() {
		if (sessionStorage.getItem('userData')) {
			if (this.state.redirect || sessionStorage.getItem('userData')) {
				return (<Redirect to={'/home'} />)
			}
		}
		const responseFacebook = (response) => {
			this.signup(response);
		}
		return (
			<div className="Container">
				<div className="omb_login">
					<h3 className="omb_authTitle">Login Form</h3>
					<div className="row omb_row-sm-offset-3 omb_loginOr">
						<div className="col-xs-12 col-sm-6">
							<hr className="omb_hrOr"></hr>
						</div>
					</div>
					<div className="row omb_row-sm-offset-3">
						<div className="col-xs-12 col-sm-6">
							<form className="omb_loginForm" >
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user"></i></span>
									<input type="text" className="form-control" name="username" placeholder="Email address" />
								</div>
								<span className="help-block"></span>
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock"></i></span>
									<input type="password" className="form-control" name="password" placeholder="Password" />
								</div>
								<span className="help-block"></span>
								<button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
							</form>
							<div className="HomePage">
									<FacebookLogin
									appId="138808123377041"
									autoLoad={false}
									fields="name,email,picture"
									icon={<TiSocialFacebookCircular />}
									callback={responseFacebook} />
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	}
}
export default Login;
