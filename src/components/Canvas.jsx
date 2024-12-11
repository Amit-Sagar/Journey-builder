import React, { useState } from "react";

const Canvas = ({ tasks, setTasks, onTaskSelect }) => {
  const [draggingTask, setDraggingTask] = useState(null); // Track the task being dragged

  const handleDrop = (event) => {
    event.preventDefault();
    const taskData = event.dataTransfer.getData("task");

    // If dragging from the sidebar (new task), create a new task
    if (taskData) {
      const task = JSON.parse(taskData);
      const newTask = {
        ...task,
        id: `${task.id}-${Date.now()}`, // Ensure unique ID for each dropped task
        position: {
          x: event.clientX - 250, // Adjust for sidebar width
          y: event.clientY - 50, // Adjust for canvas position
        },
      };
      setTasks((prev) => [...prev, newTask]);
    } else if (draggingTask) {
      // If dragging an existing task, just update its position
      const canvasBounds = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - canvasBounds.left;
      const y = event.clientY - canvasBounds.top;

      const updatedTasks = tasks.map((task) =>
        task.id === draggingTask.id
          ? { ...task, position: { x, y } } // Update the position
          : task
      );

      setTasks(updatedTasks);
    }
  };

  console.log({ tasks });
  const handleDragOver = (event) => event.preventDefault();

  const handleDragStart = (event, task) => {
    // Set the task being dragged, so we know which task is being moved inside the canvas
    setDraggingTask(task);
    event.dataTransfer.setData("task", JSON.stringify(task));
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggingTask(null); // Clear the dragging task state after dragging ends
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: "#eef2f7",
        border: "1px solid #ccc",
        overflow: "hidden",
      }}
    >
      {tasks.map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={(event) => handleDragStart(event, task)}
          onDragEnd={handleDragEnd}
          onClick={() => onTaskSelect(task)}
          style={{
            position: "absolute",
            left: task.position.x,
            top: task.position.y,
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            borderRadius: "5px",
            cursor: "grab",
          }}
        >
          {task.label}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
