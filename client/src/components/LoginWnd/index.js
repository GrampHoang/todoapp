import React, { useState } from 'react';
import firebase from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth  } from "firebase/auth";
import './styles.css';
import 'firebase/auth';

const LoginWnd = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState('');

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      // User is signed in, you can handle this event
    } catch (error) {
      console.error('Error signing in:', error);
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
    <div className={`loginWnd ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="login-content">
        <div className='header'>
          <text className='headertext'>Login</text>
          <button onClick={() => onClose()}>Close</button>
        </div>
        {/* Add login form fields */}
        <input
          type="text"
          placeholder="Your email"
          style={{ height: '30px', width: "70%"}}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          placeholderTextColor="#808080"
        />

        <input
          type={"password"}
          placeholder="Your password"
          style={{ height: '30px', width: "70%"}}
          onChangeText={password => setPassword(password)}
          autoCapitalize="none"
          placeholderTextColor="#808080"
        />

        {/* <button className="loginBtn" onClick={handleLogin}>Login</button> */}
        <button className="loginBtn" onClick={signInWithGoogle}>Login</button>
        
      </div>
    </div>
  );
};

export default LoginWnd;
