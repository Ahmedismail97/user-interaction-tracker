import { useEffect, useState } from 'react';
import { ref, push } from 'firebase/database';
import { database, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Tracker = () => {
  const [user] = useAuthState(auth);
  const [clicks, setClicks] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (user) {
      const logSession = () => {
        const endTime = Date.now();
        const sessionDuration = endTime - startTime;

        const sessionRef = ref(database, `sessions/${user.uid}`);
        push(sessionRef, {
          email: user.email,
          name: user.displayName,
          clicks,
          sessionDuration,
          timestamp: new Date().toISOString(),
        });
      };

      window.addEventListener('beforeunload', logSession);

      return () => {
        logSession();
        window.removeEventListener('beforeunload', logSession);
      };
    }
  }, [clicks, startTime, user]);

  return (
    <div className="container text-center">
      <h3 className="text-lg mt-4">Button Clicks: {clicks}</h3>
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setClicks(clicks + 1)}
      >
        Click Me
      </button>
    </div>
  );
};

export default Tracker;
