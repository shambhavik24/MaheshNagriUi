import React, { useState } from 'react';
import './Meeting.css';
import axios from 'axios';

const Meeting = () => {
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [meetingVenue, setMeetingVenue] = useState('');
    const [numberId, setNumberId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [meetings, setMeetings] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8084/meeting`, {
                meetingDate,
                meetingTime,
                meetingVenue
            });

            console.log("Data added Successfully", response)
            alert('Successful');

            

            setMeetingDate('')
            setMeetingTime('')
            setMeetingVenue('')
        
        } catch (error) {
            console.log('Failed to add the data');
            alert('Failed to add information');
            if (error.response) {
                console.log('Response data', error.response.data);
                console.log('Response status', error.response.status);
                console.log('Response header', error.response.header);
            } else {
                console.log('An unknown error');
            }
        }

        
    };

    return (
       
        <div className="meeting-container">

            <form className="meeting-form" onSubmit={submitHandler}>
            <h2 className="header">Meeting Form</h2>

                <div className="form-group">
                    <label htmlFor='meetingDate'>Meeting Date</label>
                    <input
                        type='date'
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        id='meetingDate'
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='meetingTime'>Meeting Time</label>
                    <input
                        type='time'
                        value={meetingTime}
                        onChange={(e) => setMeetingTime(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='meetingVenue'>Meeting Venue</label>
                    <input
                        type='text'
                        placeholder='Enter a venue'
                        value={meetingVenue}
                        onChange={(e) => setMeetingVenue(e.target.value)}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor='name'>Name</label>
                    <input 
                    type='text'
                    value={name}
                    onChange={(e) => setName}
                       
                       />
                </div>
                <div className="button-container">
                    <button type='submit' className="submit-button">Submit</button>
                </div>
            </form>
        </div>
      
    );
};

export default Meeting;