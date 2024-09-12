import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";
import { auth } from "../firebase/firebase"; // Adjust the path as needed
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User as FirebaseUser } from "firebase/auth";
import { useCreateMyUser } from "../../src/api/MyUserApi"; 

// Define a type for the user state
interface User {
  email: string | null;
}

const MobileNav: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider(); // Create an instance of GoogleAuthProvider
  const { createUser, isLoading: isCreatingUser } = useCreateMyUser(); // Use the create user hook

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: FirebaseUser | null) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setUser({ email: currentUser.email });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Create user in backend after successful login
      await createUser({
        auth0Id: user.uid, 
        email: user.email || ''
      });

      
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-orange-500" />
              {user?.email || "No Email"}
            </span>
          ) : (
            <span> Welcome to MernEats.com!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={handleLogin}
              className="flex-1 font-bold bg-orange-500"
              disabled={isCreatingUser} // Disable button while creating user
            >
              {isCreatingUser ? 'Logging In...' : 'Log In'}
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
