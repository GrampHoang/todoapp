import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth  } from "firebase/auth";
import './styles.css';
import 'firebase/auth';

const LoginWnd = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Add this state

  const toSignUp = () => {
    setIsSignUp(true);
    const logWnd = document.getElementsByClassName('loginWnd')[0];
    const logContent = document.getElementsByClassName('loginContent')[0];
    const reconfirm = document.getElementsByClassName('passAgain')[0];
    logWnd.style.height = "195px"
    logContent.style.height = "155px"
    reconfirm.style.visibility = 'visible';
    setLoginError("");
  };

  const toLogin = () => {
    setIsSignUp(false);
    const logWnd = document.getElementsByClassName('loginWnd')[0];
    const logContent = document.getElementsByClassName('loginContent')[0];
    const reconfirm = document.getElementsByClassName('passAgain')[0];
    logWnd.style.height = "160px"
    logContent.style.height = "120px"
    reconfirm.style.visibility = 'hidden';
    setLoginError("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState('');

  const signInWithGoogle = async () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // try {
    //   await firebase.auth().signInWithPopup(provider);
    //   // User is signed in, you can handle this event
    // } catch (error) {
    //   console.error('Error signing in:', error);
    // }
    try {
      if (email !== '' && password !== '') {
        await signInWithEmailAndPassword(firebase, email, password);
        onAuthStateChanged(firebase, (user) => {
          if (user) {
            console.log('Loggin in as:',user.email)
            // AsyncStorage.setItem('@user', user.email);
          }
       });
      }
    } catch (error) {
      console.log("Email hoặc mật khẩu chưa chính xác");
      setLoginError("Email hoặc mật khẩu chưa chính xác");
    }

  };

  const handleLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await signInWithEmailAndPassword(firebase, email, password);
        onAuthStateChanged(firebase, (user) => {
          if (user) {
            console.log('Loggin in as:',user.email)
            // AsyncStorage.setItem('@user', user.email);
          }
       });
       onClose();
      } else {
        setLoginError("Please fill out the fields");
      }
    } catch (error) {
      setLoginError("Email or password incorrect");
    }
  };

  const handleSignup = async () => {
    try {
      if (email !== '' && password !== '') {
        await signInWithEmailAndPassword(firebase, email, password);
        onAuthStateChanged(firebase, (user) => {
          if (user) {
            console.log('Loggin in as:',user.email)
            // AsyncStorage.setItem('@user', user.email);
          }
       });
       onClose();
      } else {
        setLoginError("Please fill out the fields");
      }
    } catch (error) {
      setLoginError("Email or password incorrect");
    }
  };

  useEffect(() => {
    toLogin()
  }, []);

  return (
    <div className={`loginWnd ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="loginContent">
        <div className='header'>
          <div className='headertext'>{isSignUp ? 'Sign Up' : 'Login'}</div>
          <div className='errortext'>{loginError}</div>
          <button onClick={() => onClose()}>Close</button>
        </div>
        {/* Add login form fields */}
        <input
          type="text"
          placeholder="Your email"
          style={{ height: '30px', width: "70%"}}
          onChange={(e) => setEmail(e.target.value)}
          autoCapitalize="none"
        />

        <input
          type={"password"}
          placeholder="Your password"
          style={{ height: '30px', width: "70%"}}
          onChange={(e) => setPassword(e.target.value)}
          // onChange={password => setPassword(password)}
          autoCapitalize="none"
        />

        <input
          className='passAgain'
          visibility="hidden"
          type={"password"}
          placeholder="Confirm your password"
          style={{ height: '30px', width: "70%"}}
          onChange={(e) => setPassword(e.target.value)}
          autoCapitalize="none"
        />

        {/* <button className="loginBtn" onClick={handleLogin}>Login</button> */}
        
        
      </div>
      <div className="btnArea">
        <button className="loginBtn" onClick={isSignUp ? handleSignup : handleLogin}>
                                            {isSignUp ? 'Sign Up' : 'Login'}</button>
        <div className="askacc">{isSignUp ? `Have an account?` : `Don't have account yet?`}</div>
        <button className="signupBtn" onClick={isSignUp ? toLogin : toSignUp}>
                                            {isSignUp ? 'To Login' : 'To Sign Up'}</button>
      </div>
    </div>
  );
};

export default LoginWnd;
