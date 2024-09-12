import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase/firebase'

const provider = new GoogleAuthProvider();

const AuthComponent: React.FC = () => {
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          console.log('Redirect User:', user);
        }
      } catch (error) {
        console.error('Redirect Sign-In Error:', error);
      }
    };

    handleRedirectResult();
  }, []);

  const handleSignInWithPopup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Popup User:', user);
    } catch (error) {
      console.error('Popup Sign-In Error:', error);
    }
  };

  const handleSignInWithRedirect = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div>
      <button onClick={handleSignInWithPopup}>Sign In with Popup</button>
      <button onClick={handleSignInWithRedirect}>Sign In with Redirect</button>
    </div>
  );
};

export default AuthComponent;
