import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const googleLogo  = 'https://i.ibb.co/CwfcDZh/Group-573.png'
const facebookLogo = 'https://i.ibb.co/H42QGtB/Group-2.png'

function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })
//eslint-disable-next-line
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  const history = useHistory();
  const location = useLocation();
  
  const { from } = location.state || { from: { pathname: "/destinationtimeline" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(result => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        console.log(displayName, photoURL, email)
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        const credential = result.credential;
        const user = result.user;
        const accessToken = credential.accessToken;
        setUser(user);
        console.log(user, accessToken)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential)
      });
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(result => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser);
      }).catch((error) => {
        console.log(error)
      });
  }

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
    }
    if (event.target.name === 'password') {
      isFieldValid = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/.test(event.target.value)
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log('Sign In User Info', res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    event.preventDefault();

  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
      console.log('User Name Updated Successfully')
    }).catch(function (error) {
      console.log(error)
    });
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="form">
        {!newUser ? <h3 className="login-title">Login</h3> : <h3 className="login-title">Create an account</h3>}

        <form onSubmit={handleSubmit}>
          {newUser && <input type="text" onBlur={handleBlur} name='name' placeholder='Name' />}
          <br />
          <input type="text" onBlur={handleBlur} name='email' placeholder='Email' required />
          <br />
          <input type="password" onBlur={handleBlur} name="password" id="" placeholder='Password' required />
          <br />
          {newUser && <input type="password" onBlur={handleBlur} name="password" id="" placeholder='Confirm Password' required />}
          <br />
          <br/>
          <div className="" style={{ display: 'flex' }}>
            {!newUser && <input style={{ margin: '1% 1% 0 12%' }} type="checkbox" name="Remember Me" id="" />}
            {!newUser && <label htmlFor="Remember Me"> Remember Me</label>}
            {
              !newUser && <p style={{ marginLeft: '30%', color: 'tomato' }}> Forgot Password?</p>
            }
          </div>

          <input className='submit-btn' type="submit" value={newUser ? "Create an account" : "Sign In"} />
          <br />
          <br />

          <p onClick={() => setNewUser(!newUser)} name="newUser">{newUser ? "Already have an account? L͟o͟g͟ I͟n͟" : "Don't have an account? C͟r͟e͟a͟t͟e͟ a͟n͟ a͟c͟c͟o͟u͟n͟t͟"}</p>
        </form>

        <p style={{ color: 'red' }}>{user.error}</p>
        {
          user.success && <p style={{ color: 'green' }}>Successfully Signed {newUser ? 'Up' : 'In'}</p>
        }

      </div>
      
      <div className="line">
        <div className="line1"></div>
        <p style={{marginTop:'10px'}}>Or</p>
        <div className="line2"></div>
      </div>

       <div className="social-button-container">
      <img src={facebookLogo} style={{width:'5%'}} alt=""/>
      <button className='social-buttons' style={{ width: '25%' }} onClick={handleFbSignIn}>Continue with Facebook</button>
       </div>
      <br />
      <br />
      <div className="social-button-container">
        <img src={googleLogo} style={{width:'5%'}} alt=""/>
      {user.isSignedIn ?
        <button className='social-buttons' style={{ width: '25%' }} onClick={handleSignOut}>Sign Out</button> :
        <button className='social-buttons' style={{ width: '25%' }} onClick={handleSignIn}>Continue with Google</button>
      }
      </div>
    </div>
  );
}

export default Login;