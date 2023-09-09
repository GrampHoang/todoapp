import React, { useState, useEffect } from 'react';
// import client from './feather.js';
import './App.css';
import './style.css';
import Job from './components/Job/index.js'

import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

const client = feathers();
const restClient = rest('http://localhost:3030');
client.configure(restClient.fetch(window.fetch.bind(window)));
const jobService = client.service('job');

function App() {
  const [jobs, setJobs] = useState([]);
  // const client = feather

  const addJob = async (id) => {  
    try {
      // POST request to create a new job
      const newJob = await client.service('job').create(id);
      
      // Update the local state to include the newly created job
      setJobs([...jobs, newJob]);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const markJobAsDone = async(id) => {
    // const updatedJobs = [...jobs];
    // updatedJobs[id].done = true;
    // setJobs(updatedJobs);

    try {
      // Send a PATCH request to mark the job as done
      await client.service('job').patch(id, { done: true });
  
      // Update the local state to reflect the change
      const updatedJobs = jobs.map((job) =>
        job.id === id ? { ...job, done: true } : job
      );
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error marking job as done:', error);
    }
  };

  const deleteJob = async (id) => {
    // const updatedJobs = [...jobs];
    // updatedJobs.splice(id, 1);
    // setJobs(updatedJobs);

    try {
      // Send a DELETE request to delete the job
      await client.service('job').remove(id);
  
      // Update the local state to remove the deleted job
      const updatedJobs = jobs.filter((job) => job.id !== id);
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Send a GET request to fetch the list of jobs
        const response = await client.service('job').find();
  
        // Set the fetched jobs in the state
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
  
    // Call the fetchJobs function when the component mounts
    fetchJobs();
  }, []); // The empty array [] means this effect runs once when the component mounts.

  return (
    <div className="main">
    <div className="container">
    <h2 className="header">Simple Todo Application</h2>
    <Job onAddJob={addJob} />
    <div class="empty_space"></div>
    {jobs.map((job) => (
        <div key={job.id} className={`job-item${job.done ? '-done' : ''}`}>
          <div className="job-buttons">
            <button onClick={() => markJobAsDone(job.id)}>Done</button>
          </div>
          <div className={`job-description${job.done ? '-done' : ''}`}>
            <p>{job.description}</p>
          </div>
          <div className="job-date-time">
            <p>{job.date} {job.time}</p>
          </div>
          <div className="job-buttons">
            <button onClick={() => deleteJob(job.id)}>Delete</button>
          </div>
        </div>
      ))}

    </div>
  </div>
  );
}

export default App;
