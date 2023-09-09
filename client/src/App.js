import React, { useState, useEffect } from 'react';
import client from './feather.js';
import './App.css';
import './style.css';
import Job from './components/Job/index.js'


function App() {
  const [jobs, setJobs] = useState([]);
  // const client = feather

  const addJob = async (job) => {
    // setJobs([...jobs, job]);
    console.log("clicking")
    try {
      // POST request
      console.log("trying")
      // await client.service('job').create(job);
      await client.service('job').create({
        id: 1,
        description: "sil",
        done: true,
        date: "sil",
        time: "sil",
      });
      // update state
      setJobs([...jobs, job]);
    } catch (error) {
      console.log("fail")
      console.error('Error adding job:', error);
    }
    console.log("after")
  };

  const markJobAsDone = async(id) => {
    const updatedJobs = [...jobs];
    updatedJobs[id].done = true;
    setJobs(updatedJobs);

    // try {
    //   // Send a PATCH request to mark the job as done
    //   await app.service('job').patch(id, { done: true });
  
    //   // Update the local state to reflect the change
    //   const updatedJobs = jobs.map((job) =>
    //     job.id === id ? { ...job, done: true } : job
    //   );
    //   setJobs(updatedJobs);
    // } catch (error) {
    //   console.error('Error marking job as done:', error);
    // }
  };

  const deleteJob = async (id) => {
    const updatedJobs = [...jobs];
    updatedJobs.splice(id, 1);
    setJobs(updatedJobs);

    // try {
    //   // Send a DELETE request to delete the job
    //   await app.service('job').remove(id);
  
    //   // Update the local state to remove the deleted job
    //   const updatedJobs = jobs.filter((job) => job.id !== id);
    //   setJobs(updatedJobs);
    // } catch (error) {
    //   console.error('Error deleting job:', error);
    // }
  };

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       // Send a GET request to fetch the list of jobs
  //       const response = await client.service('job').find();
  
  //       // Set the fetched jobs in the state
  //       setJobs(response.data);
  //     } catch (error) {
  //       console.error('Error fetching jobs:', error);
  //     }
  //   };
  
  //   // Call the fetchJobs function when the component mounts
  //   fetchJobs();
  // }, []); // The empty array [] means this effect runs once when the component mounts.

  return (
    <div className="main">
    <div className="container">
    <h2 className="header">Simple Todo Application</h2>
    <Job onAddJob={addJob} />
    <div class="empty_space"></div>
    {jobs.map((job, id) => (
          <div key={id} className={`job-item${job.done ? '-done' : ''}`}>
            <div className="job-buttons">
              <button onClick={() => markJobAsDone(id)}>Done</button>
            </div>
            <div className={`job-description${job.done ? '-done' : ''}`}>
              <p>{job.description}</p>
            </div>
            <div className="job-date-time">
              <p>{job.date}   {job.time}</p>
            </div>
            <div className="job-buttons">
              <button onClick={() => deleteJob(id)}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  </div>
  );
}

export default App;
