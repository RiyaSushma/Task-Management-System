// app/dashboard/page.tsx
"use client";
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { getTasks } from '../../utils/api';
import { signOut } from '../../utils/auth';

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>Tasks Dashboard</h1>
        <button onClick={signOut}>Sign Out</button> {/* Sign out button */}
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .dashboard-container {
          display: flex;
        }
        .main-content {
          margin-left: 250px;
          padding: 20px;
          width: calc(100% - 250px);
        }
      `}</style>
    </div>
  );
}
