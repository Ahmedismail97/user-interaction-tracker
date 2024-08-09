import Auth from "./components/Auth";
import Tracker from "./components/Tracker";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-2xl text-center">User Interaction Tracker</h1>
      <Auth />
      {user && <Tracker />}
    </div>
  );
};

export default App;
