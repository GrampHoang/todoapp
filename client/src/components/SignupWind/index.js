import React, { useState } from 'react';
import firebase from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth  } from "firebase/auth";
import './styles.css';
import 'firebase/auth';

const SignupWnd = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

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

  // const handleLogin = async () => {
  //   try {
  //     if (email !== '' && password !== '') {
  //       await signInWithEmailAndPassword(firebase, email, password);
  //       onAuthStateChanged(firebase, (user) => {
  //         if (user) {
  //           console.log('Loggin in as:',user.email)
  //           AsyncStorage.setItem('@user', user.email);
  //         }
  //      });
  //      onClose();
  //     } else {
  //       setLoginError("Please fill out the fields");
  //     }
  //   } catch (error) {
  //     setLoginError("Email or password incorrect");
  //   }
   
  // };

  return (
    <div className={`SignupWnd ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="loginContent">
        <div className='header'>
          <div className='headertext'>Login</div>
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
          type={"password"}
          placeholder="Your password, again"
          style={{ height: '30px', width: "70%"}}
          onChange={(e) => setPassword(e.target.value)}
          // onChange={password => setPassword(password)}
          autoCapitalize="none"
        />

        {/* <button className="loginBtn" onClick={handleLogin}>Login</button> */}
        
        
      </div>
        <button className="signupBtn" onClick={signInWithGoogle}>Sign Up</button>
        <button className="loginBtn" onClick={signInWithGoogle}>To Login Page</button>
    </div>
  );
};

export default SignupWnd;
