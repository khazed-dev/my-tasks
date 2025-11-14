import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, saveTasks } from '../services/storage';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const save = async () => {
    if (!title.trim()) return;

    const tasks = await getTasks();
    tasks.push({
      id: Date.now(),
      title,
      completed: false,
    });

    await saveTasks(tasks);
    navigate('/');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1>Thêm công việc</h1>
      </header>

      <div className="form-container">
        <input
          className="text-input"
          placeholder="Tên công việc..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <button className="primary-btn" onClick={save}>Lưu</button>
      </div>
    </div>
  );
}
