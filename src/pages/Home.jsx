import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, saveTasks } from '../services/storage';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getTasks();
      setTasks(data);
    })();
  }, []);

  const toggleTask = async (id) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    await saveTasks(updated);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Tasks</h1>
        <button className="fab" onClick={() => navigate('/add')}>+</button>
      </header>

      {tasks.length === 0 ? (
        <p className="empty-text">Không có công việc nào. Bấm + để thêm.</p>
      ) : (
        <ul className="task-list">
          {tasks.map(t => (
            <li key={t.id} onClick={() => toggleTask(t.id)} className={`task-item ${t.completed ? 'completed' : ''}`}>
              <span className="task-title">{t.title}</span>
              <span className={`badge ${t.completed ? 'done' : 'pending'}`}>
                {t.completed ? 'Done' : 'Pending'}
              </span>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
