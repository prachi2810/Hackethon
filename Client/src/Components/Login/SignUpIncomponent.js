import { React, useState, useEffect } from 'react';
import "../Login/SignUpIn.css";
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import google from "../../Images/googleicon.png";

const defaultReg = {
    username: '',
    email: '',
    password: ''
}
const defaultLogin = {
    username: '',
    password: ''
}
function SignUpIncomponent() {
    const nav = useNavigate();
    const [userName, setUsername] = useState({});
    const [signIn, setsignIn] = useState(true);
    const [fPass, setfPass] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [nPass,setnPass]=useState(false);
    const [Reg, setReg] = useState(defaultReg);
    const [Login, setLogin] = useState(defaultLogin);
    const [email,setEmail]=useState('');
    const[OTP,setOTP]=useState("")
     const[password,setPassword]=useState('');
    const notifyReg = () => toast.success("Successfully Register");
    const notifyLogin = () => toast.success("Successfully Logged In");

    const errorReg = () => toast.error("something went wrong");
    const errorStatus = () => toast.error("Username or email already exist");
    const errorStatusLogin = () => toast.error("Wrong Password or Inavlid username")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/user/login',
                JSON.stringify(Login),
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                })
            console.log(response);
            if (response.status == 200) {
                notifyLogin();
            }
            else {
                errorReg();
            }
            nav('/editor')
        }
        catch (error) {
            console.log(error);
            if (error.response.status == 400) {
                errorStatusLogin();
            }
            else {
                errorReg();
            }
        }
    }

    const handleSubmitReg = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/user/register',
                JSON.stringify(Reg),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                })
            setReg(defaultReg);
            notifyReg();
            console.log(response);
            nav('/login')
            // settoastReg(true);
        }
        catch (error) {
            console.log(error);
            if (error.response.status == 400) {
                errorStatus();
            }
            else {
                errorReg();
            }
        }
    }
    const sendOtp = async () => {
        setToggle(true); setfPass(false);
        const result = await axios.get(`http://localhost:8000/user/generateOTP/${userName}`)
        console.log(result)
    }
    const submitOTP = async () => {
        console.log(userName)
        setToggle(false);setnPass(true);
        const response = await axios.get(`http://localhost:8000/user/verifyOTP`, { params: { username: userName, code: OTP } })
        console.log(response)
    }
    const forgotPass=async ()=>{
        const response = await axios.put(`http://localhost:8000/user/forgotPassword`,{ username: userName, password:password} )
        console.log(response)
    }
    const setNewPassword=async(e)=>{
        setPassword(e.target.value)
        console.log(password)
    }
    return (
        <>
            <div className='row d-flex justify-content-center align-items-center rowClass'>
                {!nPass && !fPass && !signIn && (
                    <>
                        <div className='col-md-8 d-flex justify-content-center align-items-center SignUpContainer'>
                            <form className='FormStyle' onSubmit={handleSubmitReg}>
                                <h1 className='TitleLogin'>Create Account</h1>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <span className='hLine'></span>
                                </div>
                                {/* <div className='imageicon'>
                                    <img src={googleImg} className='gicon' alt="google" />
                                </div> */}
                                <div id="signInDiv"></div>
                                {/* <p className='Paragraph'>--or use your email account--</p> */}
                                <div class="mb-3">
                                    <input type="text" id="username" className='Input' minLength="3" placeholder='Username' onChange={(e) => setReg({ ...Reg, username: e.target.value })} required />
                                </div>
                                <div className='mb-3'>

                                    <input id="email" className='Input' type="email" placeholder='Email' onChange={(e) => setReg({ ...Reg, email: e.target.value })} required />
                                </div>
                                <div className='mb-3'>
                                    <input id="password" className='Input' type="password" placeholder='Password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" minLength="6" maxLength="12" onChange={(e) => setReg({ ...Reg, password: e.target.value })} required />

                                </div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button className='Button'>Sign Up</button>
                                    {/* <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> */}
                                    <ToastContainer />
                                </div>
                            </form>
                        </div>

                        <div className='col-md-4 d-flex justify-content-center align-items-center backColor'>

                            <div className="LeftOverlayPanel">
                                <h1 className='TitleLogin'>Welcome Back!</h1>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <span className='hLine1'></span>
                                </div>

                                <p className='Paragraph' data-testid="signinButton">To keep connected with us <br /> please login with your personal info</p>
                                <button className='GhostButton' onClick={() => setsignIn(true)} data-testid="buttonsign">Sign In</button>
                            </div>

                        </div>
                    </>
                )}

                {signIn && (<>
                    <div className='col-md-4 d-flex justify-content-center align-items-center backColor'>

                        <div className="RightOverlayPanel">

                            <h1 className='Title'>Welcome !</h1>
                            <div className='d-flex justify-content-center align-items-center'>
                                <span className='hLine1'></span>
                            </div>
                            {/* <hr className='hLine1' /> */}
                            <p className='Paragraph'>Enter Your personal details and <br />start journey with us</p>
                            <button className='GhostButton' onClick={() => { setsignIn(false); setfPass(false); }}>Sign Up</button>
                        </div>

                    </div>
                    {!nPass && !fPass && !toggle &&
                        <div className='col-md-8 d-flex justify-content-center align-items-center'>
                            <form className='FormStyle' onSubmit={handleSubmit}>
                                <h1 className='Title'>Sign in to Account</h1>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <span className='hLine'></span>
                                </div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div id="signInDiv"></div>
                                </div>
                                {/* <p className='Paragraph'>--or use your email account--</p> */}
                                <div className='mb-3'>

                                    <input id="userName" className='Input' type="text" placeholder='Username' onChange={(e) => setLogin({ ...Login, username: e.target.value })} required />
                                </div>

                                <div className='mb-3'>

                                    <input id="password" className='Input' type="password" placeholder='Password' onChange={(e) => setLogin({ ...Login, password: e.target.value })} required />
                                </div>
                                <div className='d-flex justify-content-center align-items-center mb-3 '>
                                    <a href='#' className='Anchor' onClick={() => setfPass(true)}>Forgot Your Password?</a>
                                </div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button type="submit" className='Button' data-testid="signinButt">Sign In</button>
                                    <ToastContainer />
                                </div>
                            </form>
                        </div>
                    }
                    {fPass &&
                        <div className='col-md-8 d-flex justify-content-center align-items-center'>
                            <div>
                                <form className='Form'>
                                    <input id="email" className='Input' type="text" placeholder='Enter Username' onChange={(e) => { setUsername(e.target.value) }} />
                                    <button className='Button' onClick={sendOtp}>Send OTP</button>
                                </form>
                            </div>
                        </div>
                    }
                    {toggle &&
                        <div className='col-md-8 d-flex justify-content-center align-items-center'>
                            <div>
                                <form className='Form'>
                                    <input id="text" maxLength={4} className='Input' type="text" placeholder='Enter OTP' onChange={(e) => { setOTP(e.target.value); console.log(OTP) }} />
                                    <button className='Button' onClick={submitOTP}>Submit</button>
                                </form>
                            </div>
                        </div>
                    }
                    {
                        nPass &&
                        <div className='col-md-8 d-flex justify-content-center align-items-center'>
                            <div>
                                <form className='Form'>
                           
                                    <input id="password" className='Input' type="text" placeholder='New Password' onChange={(e) => { setNewPassword(e)}} />
                                    <button className='Button' onClick={forgotPass}>Submit</button>
                                </form>
                            </div>
                        </div>
                    }

                </>
                )}
            </div>
        </>
    )
}

export default SignUpIncomponent;