import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

function LogIn() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        setUser({
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signOutUser);
      })
      .catch(error => {
        console.log(error);
      })
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // Signed in 
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateName(user.name);

          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ..
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // Signed in
          console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          // ...
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    e.preventDefault();
  }
  const handleBur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 7;
      const isPasswordHasNumber = /\d/.test(e.target.value)
      isFormValid = isPasswordValid && isPasswordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const updateName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then( res => {
      console.log('successfully updated name');
    }).catch( (error) => {
      console.log(error);
    });

  }
  return (
    <div style = {{ textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button>
          : <button onClick={handleSignIn}>Sign In</button>
      }

      {
        user.isSignedIn &&
        <div>
          <h1>Welcome, {user.name} </h1>
          <h2>Your email: {user.email} </h2>
          <img src={user.photo} alt="" />
        </div>
      }

      <>
        <h1>Our own authentication</h1>
        <form onSubmit={handleSubmit} >
          <p><input type="checkbox" name="checkbox" onChange={() => setNewUser(!newUser)} />New User Sign Up</p>
          {
            newUser && <p><input type="text" name='name' placeholder='Your Name' onBlur={handleBur} /></p>
          }
          <p><input type="text" placeholder='Your Email Address' name='email' onBlur={handleBur} required /></p>
          <p><input type="password" placeholder='Your Password' name='password' onBlur={handleBur} required /></p>
          <p><input type="submit" value={newUser ? 'Sign Up' : 'Log In'} /></p>
        </form>
        <p style={{ color: 'red' }} > {user.error} </p>
        {
          user.success && <p style={{ color: 'green' }} >Successfully {newUser ? 'Signed Up' : 'Logged In'}</p>
        }
      </>
    </div>
  );
}

export default LogIn;
