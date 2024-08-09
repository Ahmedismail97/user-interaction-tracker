import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

const Auth = () => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error during sign-in: ", error);
    });
  };

  const signOutUser = () => {
    signOut(auth).catch((error) => {
      console.error("Error during sign-out: ", error);
    });
  };

  return (
    <div className="auth-container flex flex-col items-center">
      {user ? (
        <>
          <img src={user.photoURL} alt="User Avatar" className="rounded-full w-16 h-16" />
          <h2 className="text-xl mt-2">{user.displayName}</h2>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={signOutUser}
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default Auth;
