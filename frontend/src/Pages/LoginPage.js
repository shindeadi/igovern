import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './login.css';


class LoginPage extends Component {
    render() {
        const emailRef = React.createRef();
        const passwordRef = React.createRef();

        var loginUser = () => {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            axios.post("http://localhost:8000/user/login", {
                email,
                password,
            }).then((response) => {
                console.log(response.data);
                localStorage.setItem("Token", response.data.token);
                this.props.setupSocket();
                this.props.history.push('/dashboard');
            }).catch((err) => {
                console.log(err);
            })
        }

        return (
            <div>
                <div class="login-div">
                    <div class="logo"></div>
                    <div class="title">Sign Up</div>
                    <div class="sub-title">BETA</div>
                    <div class="fields">
                        {/* <div class="name">
                            <input
                                type="text"
                                class="user-input"
                                placeholder="Name"
                                name="name"
                                required
                                ref={nameRef}
                            />
                        </div> */}
                        <div class="username">
                            <input
                                type="email"
                                class="user-input"
                                placeholder="username"
                                name="email"
                                required
                                ref={emailRef}
                            />
                        </div>
                        <div class="password">
                            <input
                                type="password"
                                class="pass-input"
                                placeholder="password"
                                name="password"
                                pattern=".{8,12}"
                                required
                                title="8 to 12 characters"
                                ref={passwordRef}
                            />
                        </div>
                    </div>
                    <button onClick={loginUser} class="signin-button">Login</button>

                    <div class="link">
                        <p>Don't have an account ?</p>
                        <a href="/register">Register</a>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(LoginPage);