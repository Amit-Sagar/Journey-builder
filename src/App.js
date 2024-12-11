import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import FormPanel from './components/FormPanel';

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleSave = () => {
    if (!selectedTask) return; // If no task is selected, do nothing.

    // Update the tasks array with the updated selectedTask.
    const updatedTasks = tasks.map((task) => {
      if (task.id === selectedTask.id) {
        return {
          ...task, // Keep other properties intact
          label: selectedTask.label, // Update the label with the selected task's label
        };
      }
      return task;
    });

    // Update the state with the new tasks array
    setTasks(updatedTasks);
    setSelectedTask(null); // Optionally, clear the selected task after saving
    console.log(updatedTasks); // Optionally, log the updated tasks
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Canvas onTaskSelect={setSelectedTask} setTasks={setTasks} tasks={tasks} />
      <div style={{ width: '300px', borderLeft: '1px solid #ccc' }}>
        <FormPanel selectedTask={selectedTask} setSelectedTask={setSelectedTask} handleSave={handleSave} />
      </div>
    </div>
  );
};

export default App;
