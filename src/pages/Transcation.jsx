import React, { useState } from 'react';
import axios from 'axios';
import SweetAlert from '../SweetAlert';

const Transcation = () => {
  const [transcations, setTranscations] = useState([]);
  const [rtgsDate, setRtgsDate] = useState('');
  const [transactionType, setTransactionType] = useState('inward');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!rtgsDate) {
      SweetAlert("Please enter a Date");
      return;
    }

    let url = 'http://localhost:8081/transcation/outward?azonDate';
    if (transactionType === 'inward') {
      url = 'http://localhost:8081/transcation/inward-by-date';
    }

    try {
      const response = await axios.get(url, {
        params: {
          indate: rtgsDate,
          outdate: rtgsDate,
        },
      });

      console.log('Requested URL:', url);
      console.log('Requested Date:', rtgsDate);
      console.log('Response Data:', response.data); 

      if (response.data && response.data.length > 0) {
        setTranscations(response.data);
      } else {
        console.log('No data found for the given date');
        setTranscations([]);
        SweetAlert("No data available for the selected date !!!");
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
      SweetAlert('Error fetching data');
    }
  };

  // Clear the previous transactions inward and outward 
  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
    setTranscations([]); 
  };

  return (
    <div className="form-container ml-1 bac-color">
      <div className='card'>
        <div className='card-body'>
          <div className="row justify-content-center">
            <form className="form" onSubmit={submitHandler}>
              <h3 className="text-center">Transcations</h3>
              <div className="form-container">
                <div className="form-group">
                  <label htmlFor="fromDate"></label>
                  <input
                    type="date"
                    className="form-control"
                    value={rtgsDate}
                    onChange={(e) => setRtgsDate(e.target.value)}
                  />
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="inwardTransc"
                    name="transactionType"
                    className="form-check-input"
                    checked={transactionType === 'inward'}
                    onChange={() => handleTransactionTypeChange('inward')}
                  />
                  <label className="form-check-label" htmlFor="inwardTransc">Inward-Transcation</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="outwardTransc"
                    name="transactionType"
                    className="form-check-input"
                    checked={transactionType === 'outward'}
                    onChange={() => handleTransactionTypeChange('outward')}
                  />
                  <label className="form-check-label" htmlFor="outwardTransc">Outward-Transcation</label>
                </div>
                <button className="btn btn-primary mt-2 mb-2" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="table-container mt-3">
        <div className="table-components">
          <table className="table table-striped">
            <thead>
              <tr>
                {transactionType === 'inward' && (
                  <>
                    <th>File Name</th>
                    <th>Bene-Account</th>
                    <th>Bene-Name</th>
                    <th>Amount</th>
                    <th>Status Code</th>
                  </>
                )}
                {transactionType === 'outward' && (
                  <>
                    <th>File Name</th>
                    <th>Remitter-Account-Code</th>
                    <th>Remitter-Name</th>
                    <th>Amount</th>
                    <th>Transcation-Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {transcations.map((transcation, index) => (
                <tr key={index}>
                  {transactionType === 'inward' && (
                    <>
                      <td>{transcation.fileName}</td>
                      <td>{transcation.beneAccount}</td>
                      <td className='left-align'>{transcation.beneName}</td>
                      <td>{transcation.amount}</td>
                      <td>{transcation.statusCode}</td>
                    </>
                  )}
                  {transactionType === 'outward' && (
                    <>
                      <td>{transcation.fileName}</td>
                      <td>{transcation.remitterAccountCode}</td>
                      <td className='left-align'>{transcation.remitterAccountName}</td>
                      <td>{transcation.amount}</td>
                      <td>{transcation.transcationStatus}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transcation;
