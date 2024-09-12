import React from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust import based on your structure
import { Button } from './ui/button'; // Adjust import based on your structure
import { Link } from 'react-router-dom';
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import the necessary functions
import { auth } from '../firebase/firebase'; // Adjust import based on your structure

const MainNav: React.FC = () => {
  const { user, loading } = useAuth();
  const provider = new GoogleAuthProvider(); // Initialize the provider

  if (loading) return <div>Loading...</div>;

  const handleSignInWithPopup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Popup User:', user);
    } catch (error) {
      console.error('Popup Sign-In Error:', error);
    }
  };

  return (
    <span className="flex space-x-2 items-center">
      {user ? (
        <>
          <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
          <Button
            variant="ghost"
            className="font-bold hover:text-orange-500 hover:bg-white"
            onClick={() => signOut(auth)}
          >
            Log Out
          </Button>
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={handleSignInWithPopup} // Use the method directly
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
