import React, { useState, useEffect } from 'react';
import './App.css';
import './style.css';
import Job from './components/Job/index.js'

import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

import LoginWnd from './components/LoginWnd';
import firebase, { authenthication, db } from './auth/firebase';
import { collection, addDoc, getDoc, getDocs, setDoc, doc, query, deleteDoc } from 'firebase/firestore';

const client = feathers();
const restClient = rest('http://localhost:3030');
client.configure(restClient.fetch(window.fetch.bind(window)));

function App() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  
  const addJob = async (job) => {
    const desc = job.description;
    try {
      if (user) {
        try {
          const currentDate = new Date();
          const docRef = await addDoc(collection(db, user.uid), job);
          // console.log("Document written with ID: ", docRef.id);
          job.id = docRef.id;
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        setJobs([...jobs, job]);
      } else {
        // POST request to create a new job
        const newJob = await client.service('job').create(job);
        // console.log(newJob);
        // Update the local state to include the newly created job
        setJobs([...jobs, newJob]);
      }
      
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const markJobAsDone = async(id) => {
    try {
      if (user) {
        try {
          const docRef = doc(db, user.uid, id);
          const docSnap = await getDoc(docRef);
          const updatedData = {
            ...docSnap.data(),
            done: true,
          };
          await setDoc(docRef, updatedData);
        } catch (e) {
          console.error("Error changing document: ", e);
        }
      } else {
      // Send a PATCH request to mark the job as done
        await client.service('job').patch(id, { done: true });
      }
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
      if (user) {
        try {
          const docRef = doc(db, user.uid, id);
          await deleteDoc(docRef);
        } catch (e) {
          console.error("Error deleting document: ", e);
        }
      } else {
      // Send a DELETE request to delete the job
        await client.service('job').remove(id);
      }
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
    const unsubscribe = authenthication.onAuthStateChanged( async (authUser) => {
      const user = await authenthication.currentUser;
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      console.log(user)
      await fetchJobs(user);
    }, (error) => {
      console.error('Firebase Authentication Error:', error);
    });
    // setUser(null);
    // console.log(user)
    // fetchJobs();
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const fetchJobs = async (user) => {
    try {
      if (user) {
        try {
          // const docRef = collection(db, user.uid);
          // const docSnap = docRef.data;
          // console.log(docRef);
          const docQue = query(collection(db, user.uid));
          const queSnap = await getDocs(docQue);
          const jobDataArray = [];
          queSnap.forEach((doc) => {
              jobDataArray.push({ id: doc.id, ...doc.data() });
            });
          console.log(jobDataArray);
          setJobs(jobDataArray);
        } catch (e) {
          console.error("Error changing document: ", e);
        }
      }
      else{
        // Send a GET request to fetch the list of jobs
        const response = await client.service('job').find();
        console.log(response.data);
        setJobs(response.data);
        
      }
      // Set the fetched jobs in the state
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

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
