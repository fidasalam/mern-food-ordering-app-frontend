import { useState } from 'react';
import { auth } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
  
    const handleSignUp = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // Handle successful sign-up (e.g., redirect to login or dashboard)
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
        <h1 className="text-2xl mb-4">Sign Up</h1>
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
          onClick={handleSignUp}
          className="p-2 bg-blue-500 text-white"
        >
          Sign Up
        </button>
      </div>
    );
  };
  
  export default SignUp;