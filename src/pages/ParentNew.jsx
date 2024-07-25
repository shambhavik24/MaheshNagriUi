// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Parent.css';

// const ParentNew = () => {
//     const [meetingDate, setMeetingDate] = useState('');
//     const [meetingTime, setMeetingTime] = useState('');
//     const [meetingVenue, setMeetingVenue] = useState('');
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [parents, setParents] = useState([]);
//     const [types, setTypes] = useState([]);

//     useEffect(() => {
//         const fetchedTypes = ['Chairman', 'V.Chairman', 'Director', 'Employee'];
//         setTypes(fetchedTypes);
//     }, []);

//     const addTable = (e) => {
//         e.preventDefault();
//         const newParent = {
//             numberId: parents.length + 1,
//             meetingDate,
//             meetingTime,
//             meetingVenue,
//             name,
//             description,
//         };
//         setParents([...parents, newParent]);
//         clearFormFields();
//     };

//     const clearFormFields = () => {
//         setMeetingDate('');
//         setMeetingTime('');
//         setMeetingVenue('');
//         setName('');
//         setDescription('');
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:8082/meeting', parents, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log('Data added successfully', response);
//             alert('Successful!');
//         } catch (error) {
//             console.log('Failed to add the data', error);
//             alert('Failed!');
//         }
//     };

//     return (
//         <div className="parent-container">
//             <div className="form-container">
//                 <form className="meeting-form">
//                     <h2 className="header">Meeting Form</h2>

//                     <div className="form-group">
//                         <label htmlFor="meetingDate">Meeting Date</label>
//                         <input
//                             type="date"
//                             value={meetingDate}
//                             onChange={(e) => setMeetingDate(e.target.value)}
//                             id="meetingDate"
//                             className="form-input"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="meetingTime">Meeting Time</label>
//                         <input
//                             type="time"
//                             value={meetingTime}
//                             onChange={(e) => setMeetingTime(e.target.value)}
//                             className="form-input"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="meetingVenue">Meeting Venue</label>
//                         <input
//                             type="text"
//                             placeholder="Enter a venue"
//                             value={meetingVenue}
//                             onChange={(e) => setMeetingVenue(e.target.value)}
//                             className="form-input"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="name">Name</label>
//                         <select
//                             type="text"
//                             placeholder="Enter a Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         >
//                             <option value="" disabled>Select a Name</option>
//                             {types.map((type, index) => (
//                                 <option key={index} value={type}>
//                                     {type}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="description">Description</label>
//                         <input
//                             type="text"
//                             placeholder="Description..."
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                     </div>

//                     <div className="button-container">
//                         <button className="add-button" onClick={addTable}>
//                             Add Data
//                         </button>
//                     </div>
//                 </form>
//             </div>

//             <div className="table-container">
//                 <p className='para'>List of Boards</p>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Number</th>
//                             <th>Name</th>
//                             <th>Description</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {parents.map((parent, index) => (
//                             <tr key={index}>
//                                 <td>{parent.numberId}</td>
//                                 <td>{parent.name}</td>
//                                 <td>{parent.description}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <button type='button' onClick={submitHandler}>Submit</button>
//             </div>
//         </div>
//     );
// };

// export default ParentNew;
