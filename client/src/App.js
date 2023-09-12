import React, { useState, useEffect } from 'react';
import './App.css';
import './style.css';
import Job from './components/Job/index.js'

import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

import LoginWnd from './components/LoginWnd';

import firebase, { authenthication } from './auth/firebase';
// import 'firebase/auth';

const client = feathers();
const restClient = rest('http://localhost:3030');
client.configure(restClient.fetch(window.fetch.bind(window)));

function App() {
  const [user, setUser] = useState([]);
  const [jobs, setJobs] = useState([]);

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

  const handleSignOut = async () => {
    try {
      await authenthication.signOut();
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const openLoginWindow = () => {
    setIsLoginVisible(true);
  };
  const closeLoginWindow = () => {
    setIsLoginVisible(false);
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

    const unsubscribe = authenthication.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });
    setUser(null);
    // Call the fetchJobs function when the component mounts
    fetchJobs();
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="main">
    <div className="container">
    <div className='App-header'>
      <h2 className="header">Simple Todo Application</h2>
      <div className="autharea">
        <h2 className="header">Hello {user === null ? "Guest" : (user.email ? user.email.split('@')[0] : "Guest")}</h2>
        {/* <button className="authbtn" onClick={openLoginWindow}>Sign in</button> */}
        {(user == null) ? 
        <button className="authbtn" onClick={openLoginWindow}>Sign in</button>
        :
        <button className="authbtn" onClick={handleSignOut}>Sign Out</button>
        }
        {isLoginVisible && (
          <div className="overlay">
            <LoginWnd onClose={closeLoginWindow} />
          </div>
        )}
      </div>
    </div>
    <Job onAddJob={addJob} />
    <div className="empty_space"></div>
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
