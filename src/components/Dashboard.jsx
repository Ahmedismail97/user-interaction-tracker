import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const sessionsRef = ref(database, 'sessions');
    onValue(sessionsRef, (snapshot) => {
      const data = snapshot.val();
      const sessionArray = [];
      for (const userId in data) {
        for (const sessionId in data[userId]) {
          sessionArray.push({
            userId,
            ...data[userId][sessionId],
          });
        }
      }
      setSessions(sessionArray);
    });
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Clicks</th>
            <th className="py-2 px-4 border-b">Session Duration (ms)</th>
            <th className="py-2 px-4 border-b">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{session.userId}</td>
              <td className="py-2 px-4 border-b">{session.name}</td>
              <td className="py-2 px-4 border-b">{session.email}</td>
              <td className="py-2 px-4 border-b">{session.clicks}</td>
              <td className="py-2 px-4 border-b">{session.sessionDuration}</td>
              <td className="py-2 px-4 border-b">{formatTimestamp(session.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
