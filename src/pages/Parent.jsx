import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Parent.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SweetAlert from '../SweetAlert';

const Parent = () => {
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingVenue, setMeetingVenue] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parents, setParents] = useState([]);
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedTypes = ['Chairman', 'V.Chairman', 'Director', 'Employee'];
    setTypes(fetchedTypes);
  }, []);

  const validateFields = () => {
    const errors = [];
    if (!meetingDate) errors.push('Meeting Date');
    if (!meetingTime) errors.push('Meeting Time');
    if (!meetingVenue) errors.push('Meeting Venue');
    if (!name) errors.push('Name');
    if (!description) errors.push('Description');
    return errors;
  };

  const addTable = (e) => {     
    e.preventDefault();

    const errors = validateFields();
    if (errors.length > 0) {
      SweetAlert(`The following field is empty: ${errors.join(', ')}`, 'error');
      return;
    }

    const newParent = {
      numberId: parents.length + 1,
      meetingDate,
      meetingTime,
      meetingVenue,
      name,
      description,
    };

    setParents([...parents, newParent]);
    clearFormFields();
  };

  const clearFormFields = () => {
    // commented for below fields are remain same in ui it only change the name & description
    // setMeetingDate('');
    // setMeetingTime('');
    // setMeetingVenue('');
    setName('');
    setDescription('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation check before submitting
    if (!meetingDate || !meetingTime || !meetingVenue || !name || !description || parents.length === 0) {
      SweetAlert('All fields must be filled and table must have at least one entry!', 'error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/meeting', parents, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Data added successfully', response);
      SweetAlert('Data added successfully!', 'success');
    } catch (error) {
      console.log('Failed to add the data', error);
      SweetAlert('Failed to add data!', 'error');
    }
  };

  // Restriction for View previous data if date is emptyy
  const handleViewPreviousData = () => {
    if (!meetingDate) {
      SweetAlert('Please enter a date!', 'error');
      return;
    }
    navigate(`/previousParent?meetingDate=${meetingDate}`);
  };

  return (
    <div className="container mt-1 mb-10 mr-5 ml">
      <div className="row justify-content-center">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Meeting Form</h3>
            <form onSubmit={submitHandler} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="meetingDate" className="form-label">Meeting Date</label>
                <input 
                  type="date" 
                  className="form-control" 
                  id="meetingDate"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="meetingTime" className="form-label">Meeting Time</label>
                <input 
                  type="time" 
                  className="form-control" 
                  id="meetingTime"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="meetingVenue" className="form-label">Meeting Venue</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="meetingVenue"
                  placeholder="Enter a venue"
                  value={meetingVenue}
                  onChange={(e) => setMeetingVenue(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name</label>
                <select 
                  className="form-select" 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a Name</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="col-12 d-flex justify-content-between mt-3">
                <button className="btn btn-primary me-2" onClick={addTable}>Add Data</button>

                <button 
                  className='btn btn-primary' 
                  onClick={handleViewPreviousData}
                >
                  View previous Data
                </button>
              </div>
            </form>

            <div className="table-container mt-4">
              <div className="table-components">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Sr.No</th>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                  {parents.map((parent, index) => (
                    <tr key={index}>
                      <td>{parent.numberId}</td>
                      <td>{parent.name}</td>
                      <td>{parent.description}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-success" onClick={submitHandler}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parent;
