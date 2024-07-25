import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Report.css';
import SweetAlert from '../SweetAlert';

const Report = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reports, setReports] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    //If the Date range is empty !!
    if (!fromDate || !toDate) {
      SweetAlert('Please select both From-Date and To-Date.');
      return;
    }


    try {
      const response = await axios.get(`http://localhost:8081/report/Allrepo?fromDate=${fromDate}&toDate=${toDate}`);
      console.log('Data fetched successfully:', response.data);
      alert('Fetched successfully');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("Error fetching data");
    }
  };

  return (
    <div className="form-container mt-3">
      <div className="card">
        <div className="card-body">
          <div className="report-container row justify-content-center">
            <form className='form' onSubmit={submitHandler}>
              <h3 className='card-title text-center'>Report</h3>

              <div className="form-group">
                <label htmlFor='fromDate'>From-Date</label>
                <input
                  type='date'
                  placeholder=''
                  className='form-control'
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="form-group mb-2 bg-grey">
                <label htmlFor='toDate'>To-Date</label>
                <input
                  type='date'
                  placeholder=''
                  className='form-control'
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <button className='submit' type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>

      <div className="table-container mt-5">
        <div className="table-form row justify-content-center">
          <p className='fs-4 fw-bold'>List of Reports</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Previous-Month</th>
                <th>Previous No. Account</th>
                <th>Difference</th>
                <th>Current No. Account</th>
                <th>Ratio</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>{report.productCode}</td>
                  <td>{report.preMonth}</td>
                  <td>{report.preNumberAccount}</td>
                  <td>{report.difference}</td>
                  <td>{report.currentMonth}</td>
                  <td>{report.ratio}</td>
                  <td>
                    <Link to={`/productPdf?fromDate=${fromDate}&toDate=${toDate}&productCode=${report.productCode}`} >
                      <button className="btn btn-primary">Generate Field</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12 text-center">
          <Link to={`/reportPdf?fromDate=${fromDate}&toDate=${toDate}`}>
            <button className='btn btn-secondary'>
              Generate Product PDF
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Report;
