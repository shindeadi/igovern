import React, { Component } from 'react';
import axios from 'axios';
import './login.css';


class RegisterPage extends Component {



    render() {
        const nameRef = React.createRef();
        const emailRef = React.createRef();
        const passwordRef = React.createRef();

        var registerUser = () => {
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            axios.post("http://localhost:8000/user/register", {
                name,
                email,
                password,
            }).then((response) => {
                console.log(response.data);
                this.props.history.push('/login');
            }).catch((err) => {
                console.log(err);
            })
        }


        return (
            <div>
                <div class="login-div">
                    <div class="logo"></div>
                    <div class="title">iGovern</div>
                    <div class="sub-title">Sign Up</div>
                    <div class="fields">
                        <div class="name">
                            <input
                                type="text"
                                class="user-input"
                                placeholder="Name"
                                name="name"
                                required
                                ref={nameRef}
                            />
                        </div>
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
                        <div>
                            <input type="radio" style={radioStyle} name="isGovernment" value={true}/>
                            <label for="government" style={radioStyle}>Governmet Official</label><br/>
                            <input type="radio" style={radioStyle} name="isGovernment" value={false}/>
                            <label for="citizen" style={radioStyle}>Indian Citizen</label><br/>
                        </div>
                    </div>
                    <button onClick={registerUser} class="signin-button">Register</button>

                    <div class="link">
                        <p>Already have an account ?</p>
                        <a href="/login">Login</a>
                    </div>
                </div>
            </div>
        );
    }


}

const radioStyle = {
    padding: "5px"
}

export default RegisterPage;