// src/components/Job.js

import React, { useState } from 'react';
import './style.css'

function Job({ onAddJob }) {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddJob = () => {
    if (description.trim() === '') {
      return; // Prevent adding empty jobs
    }

    const currentDate = new Date();
    const job = {
      description,
      done: false,
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
    };

    onAddJob(job);

    // Clear the description input
    setDescription('');
  };

  return (
    <div className="job" class="job">
        {/* <label>Description:</label> */}
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="What to do..."
          style={{ height: '30px', width: "70%"}}
        />
      <button onClick={handleAddJob} style={{width: "20%"}}>Add Job</button>
    </div>
  );
}

export default Job;
