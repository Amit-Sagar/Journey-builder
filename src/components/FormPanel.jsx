import React from "react";

const FormPanel = ({ selectedTask, setSelectedTask, handleSave }) => {
  if (!selectedTask) {
    return (
      <div style={{ padding: "10px" }}>Select a task to edit its details.</div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask({ ...selectedTask, [name]: value });
  };

  const handleSaveClick = (e) => {
    e.preventDefault(); // Prevent the form from submitting the default way
    handleSave(); // Call the save function passed from the parent
  };

  return (
    <div
      style={{ padding: "10px", backgroundColor: "#f9f9f9", height: "100%" }}
    >
      <h4>Edit {selectedTask.label}</h4>
      <form>
        <div style={{ marginBottom: "10px" }}>
          <label>Task Name:</label>
          <input
            type="text"
            defaultValue={selectedTask.label}
            name="label"
            style={{ width: "100%", padding: "5px", marginTop: "5px" }}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSaveClick} style={{ padding: "5px 10px" }}>
          Save
        </button>
      </form>
    </div>
  );
};

export default FormPanel;
