import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
// import { useAuth } from '@/context/AuthContext';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
  
    const handleSignIn = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // Handle successful sign-in (e.g., redirect to dashboard)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Sign In</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border mb-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border mb-2"
        />
        <button
          onClick={handleSignIn}
          className="p-2 bg-blue-500 text-white"
        >
          Sign In
        </button>
      </div>
    );
  };
  
  export default SignIn;