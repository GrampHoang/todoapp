import React, { useState, useEffect } from 'react';
import authenthication from '../../auth/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword  } from "firebase/auth";
import './styles.css';

const LoginWnd = ({ onClose }) => {
  const isVisible = false;
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

  const handleLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        console.log(authenthication);
        await signInWithEmailAndPassword(authenthication, email, password);
        onAuthStateChanged(authenthication, (userCredential) => {
          if (userCredential) {
            console.log('Loggin in as:',userCredential.email)
            console.log(userCredential.user)
            // AsyncStorage.setItem('@user', user.email);
          }
       });
       onClose();
      } else {
        setLoginError("Please fill out the fields");
      }
    } catch (error) {
      setLoginError("Email or password incorrect");
      console.error(error);
    }
  };

  const handleSignup = async () => {
    try{
      if (email !== '' && password !== '') {
        await createUserWithEmailAndPassword(authenthication, email, password).then(() => {
          console.log('User account created & signed in!');
          // postData(username) Sync user data here, or pop up and ask if you want to sycn or not
        })
      }
    }
      catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setLoginError('Email already in use!');
        }
        else if (error.code === 'auth/invalid-email') {
          setLoginError('Invalid Email!');
        }
        else if (error.code === 'auth/weak-password') {
          setLoginError('Password too weak!');
        }
        else {
          setLoginError("Unkown Error");
        }
        console.error(error);
        
    }
  }

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
