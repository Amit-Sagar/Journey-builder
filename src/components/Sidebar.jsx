import React from "react";

const tasks = [
  { id: "email", label: "Email Task" },
  { id: "sms", label: "SMS Task" },
  { id: "decision", label: "Decision Split" },
];

const Sidebar = () => {
  const handleDragStart = (event, task) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  return (
    <div
      style={{ width: "200px", padding: "10px", backgroundColor: "#f4f4f4" }}
    >
      <h4>Tasks</h4>
      {tasks.map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={(event) => handleDragStart(event, task)}
          style={{
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "grab",
            backgroundColor: "#fff",
          }}
        >
          {task.label}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
