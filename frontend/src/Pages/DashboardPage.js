import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './DashboardPage.css';
import { Jumbotron } from 'react-bootstrap';
import './css/style.css';
import './css/bootstrap.min.css';
import { useJwt } from "react-jwt";
//comment for push
const DashboardPage = (props) => {
    const [chatrooms, setChatrooms] = React.useState([]);
    const [reforms, setReforms] = React.useState([]);
    const inputRef = React.useRef();
    const logoutRef = React.useRef();
    const uploaderRef = React.useRef();
    const textRef = React.useRef();
    const departmentRef = React.useRef();
    // const userID = React.useState(null);
    const userID = useJwt(localStorage.getItem('Token')).decodedToken;
    // console.log("userID", userID["id"]);

    const getChatrooms = () => {
        axios.get('http://localhost:8000/chatroom', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
            }
        }).then((response) => {
            console.log(localStorage.getItem("Token"));
            console.log(response.data);
            setChatrooms(response.data);
        }).catch((err) => {
            // console.log(err.response);
            console.log(localStorage.getItem("Token"));
            setTimeout(getChatrooms, 10000);
        })
    }

    const getReforms = () => {
        axios.get('http://localhost:8000/reform', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
            }
        }).then((response) => {
            // console.log(response.data);
            setReforms(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const createChatroom = () => {
        console.log('Creating chatroom')
        axios.post('http://localhost:8000/chatroom',
            { name: inputRef.current.value },
            { headers: { Authorization: "Bearer " + localStorage.getItem("Token") } }).then(response => {
                // props.history.push('/dashboard');
                window.location.reload();
            })
    }

    const createReform = () => {
        axios.post('http://localhost:8000/reform', {
            uploader: userID["id"],
            text: textRef.current.value,
            department: departmentRef.current.value
        }, { headers: { Authorization: "Bearer " + localStorage.getItem("Token") } }).then((response)=>{
            console.log('success',response.data)
        })
        window.location.reload();
    }

    const logout = () => {
        localStorage.removeItem('Token');
        props.history.push('/login');
    }

    React.useEffect(() => {
        getChatrooms();
        getReforms();
        // const userID = useJwt(localStorage.getItem('Token')).decodedToken.id;
        // console.log("userID", userID);
    }, [])

    // reforms.map(dummyPost => console.log(dummyPost));
    // console.log(reforms);

    const upvoteReform = (userID, reformID) => {
        axios.post('http://localhost:8000/reform/upvote', {userID, reformID},
         { headers: { Authorization: "Bearer " + localStorage.getItem("Token") }}).then((response)=>{
             console.log("Upvote success: ",response)
            window.location.reload();}).catch((err) => {console.log("Upvote failure:", err)})
    }

    const downvoteReform = (userID, reformID) => {
        axios.post('http://localhost:8000/reform/downvote', {userID, reformID},
         { headers: { Authorization: "Bearer " + localStorage.getItem("Token") }}).then((response)=>{
             console.log("Downvote success: ",response)
            window.location.reload();}).catch((err) => {console.log("Downvote failure:", err)})
    }
    
    const newComponent = reforms.map( dummyPost => {
        return(
        <div>
        <div className="row">
            <div className="entries">
    
                <div className="entry">
                    <h2 className="entry-title">
                        {dummyPost.id}
                    </h2>
    
                    <div className="entry-meta">
                        <ul>
                        <li className="d-flex align-items-center"><i className="icofont-user"></i> {dummyPost.id}</li>
                        <li className="d-flex align-items-center"><i className="icofont-wall-clock"></i> {dummyPost.id}</li>
                        </ul>
                    </div>
    
                    <div className="entry-content">
                        <p>{dummyPost.text}</p>
                        <div className="read-more">
                        Read More
                        </div>
                    </div>
                    <div id='vote'>
                        <button type="button" className="btn btn-success vo" id="up" onClick={() => {upvoteReform(userID["id"], dummyPost._id)}} >Upvote<span>{" ("+dummyPost.upvoters.length+") "}</span></button>
                        <button type="button" className="btn btn-danger vo" id="down"  onClick={() => {downvoteReform(userID["id"], dummyPost._id)}}>Downvote<span>{" ("+dummyPost.downvoters.length+") "}</span></button>
                    </div>
                </div>
            </div>
                                          
        </div>
        </div>
        )
    })
    return (
        <div>
        {/* <div>
            <input type="text" name="chatroomName" id="chatroomName" ref={inputRef} />
            <button onClick={createChatroom}>Create chatroom</button>
            <h1>Create reform</h1>
            <input type='text' ref={uploaderRef} placeholder='uploader'></input>
            <input type='text' ref={textRef}></input>
            <input type='text' ref={departmentRef}></input>
            <button onClick={createReform}>Post Reform</button>
            
            {reforms.map(reform => (
                <div key={reform._id} >{reform.text}
                    
                </div>
            ))}
            <button ref={logoutRef} onClick={logout}>Logout</button>
        </div> */}
        <div>
            <header id="header" class="fixed-top ">
                    <div class="container">
                        <div class="logo float-left">
                            {/* <h1 class="text-light"><a href="dashboard"></a></h1> */}
                        </div>
                        <nav class="nav-menu float-right d-none d-lg-block">
                            <ul>
                            <li><a href="dashboard">Home</a></li>
                            <li><a href="about.html">Raise an Issue</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
            <div className="dashboard">
                <div className="feeds">
                    <div className="feeds_body">
                        <h1>Reforms</h1>
                        <section class="blog" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
                        <div class="container">
                            {newComponent}
                        </div>
                        </section>
                    </div>
                </div>
                <div className="feedsRight">
                    <h1>Create Reform</h1>
                    <form>
                        {/* <div class="form-group">
                            <label for="dept">Department</label>
                            <select class="form-control" id="sel1">
                                <option selected>Select Department</option>
                                <option>Healthcare</option>
                                <option>Road Safety</option>
                                <option>Scholarship</option>
                                <option>Electricity</option>
                            </select>
                        </div> */}
                        {/* <div class="form-group">
                            <label for="msg">UserID</label>
                            <input id="issue" ref={uploaderRef} placeholder='uploader' name="issue" rows="4" cols="55"/>
                        </div> */}
                        <div class="form-group">
                            <label for="msg">Department ID</label>
                            <input id="issue" type='text' ref={departmentRef} placeholder='department id' name="issue" rows="4" cols="55"/>
                        </div>
                        <div class="form-group">
                            <label for="msg">Message</label>
                            <textarea id="issue" type='text' ref={textRef} name="issue" rows="4" cols="55"/>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={createReform}>Post Reform</button>
                    </form>
                </div>
            </div>
            <footer id="footer" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
                <div class="footer-newsletter">
                    <div class="container">
                        <div class="row">
                        <div class="col-lg-6">
                            <h4>Igovern</h4>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="footer-top">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 footer-contact">
                            <h4>Contact Us</h4>
                            <p>
                                Vishwakarma Institute of Technology
                                Pune, 310037
                                Maharashtra
                                <strong>Phone:</strong> 7057939112
                                <strong>Email:</strong> info2@example.com
                            </p>
                        </div>
                        <div class="col-lg-3 col-md-6 footer-info">
                            <div class="social-links mt-3">
                            <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
                            <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
                            <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
                            <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </footer>
        </div>
        </div>

    );
};

export default withRouter(DashboardPage);