import React, { useState } from 'react'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import firebase, { auth } from '../../firebase';
import OtpInput from 'react-otp-input';
import axios from 'axios';
import Chatbot from './Chatbot';
import { useSelector } from 'react-redux';

const OtpVerify = () => {

    const currentUser = useSelector((state) => state.currentUserReducer)

    const [verified, setVerified] = useState(false)
    const [number, setNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [showOtp, setShowOtp] = useState(false)

    const genererateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        }, auth);
    }

    const requestOtp = (e) => {
        e.preventDefault();
        if (number.length !== 10) {
            alert("Enter valid number")
            return
        }
        genererateRecaptcha();
        const phoneNumber = '+91' + number
        signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier).then((confirmationResult) => {
            setShowOtp(true)
            window.confirmationResult = confirmationResult;
            // ...
        }).catch((error) => {
            // Error; SMS not sent
            alert(error)
            console.log(error)
        });
    }

    const verifyOtp = (e) => {
        e.preventDefault();

        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(otp).then(async (result) => {
            // User signed in successfully.
            setVerified(true)

        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            alert(error)
            console.log(error)
        });
    }

    return (<>
        {
            !currentUser ? <h1>Please Login to use Chatbot</h1>
                :
                <>
                    {!verified ?
                        <div className='ask-question otpcontainer'>
                            <div className='ask-ques-container '>
                                <h1>Verify to Ask Question to Chatbot</h1>
                                <form onSubmit={verifyOtp}>
                                    <div className='ask-form-container '>
                                        <label htmlFor='ask-ques-title'>
                                            <h4>Phone Number</h4>
                                            <input type='number' id='phoneinput' placeholder='Enter your phone number'
                                                onChange={(e) => setNumber(e.target.value)}
                                            />
                                        </label>
                                        <button onClick={requestOtp} className="review-btn" >Send OTP</button>

                                        <div id="recaptcha-container" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                        </div>

                                        {showOtp && <div className='optinput'>
                                            <h4>Enter OTP</h4>
                                            <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={6}
                                                otpType="number"
                                                renderSeparator={<span>-</span>}
                                                inputStyle={{ display: "flex", justifyContent: "center", alignContent: "center", height: "2rem", width: "2rem", fontSize: "1.5rem" }}
                                                renderInput={(props) => <input {...props} />
                                                } />
                                            <input type='submit' value='Verify OTP' className="review-btn" />
                                        </div>}

                                    </div>
                                </form>

                            </div>
                        </div>

                        : <Chatbot />}
                </>
        }
    </>
    )
}

export default OtpVerify