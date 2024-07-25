import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReportPdf.css';

const ReportPdf = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromDate = searchParams.get('fromDate');
  const toDate = searchParams.get('toDate');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/account/dates?fromDate=${fromDate}&toDate=${toDate}`);
        console.log('Data displayed successfully:', response.data);
        alert('Data Displayed!!!');
        setAccounts(response.data);
      } catch (error) {
        console.log('Failed to display data!', error);
        alert('Failed to display information');
      }
    };

    if (fromDate && toDate) {
      fetchData();
    }
  }, [fromDate, toDate]);

  const handleDownloadPdf = () => {
    const input = document.getElementById('reportContent');
    html2canvas(input, { scrollY: -window.scrollY }) 
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save('report.pdf');
      })
      .catch((error) => {
        console.log('Failed to generate PDF', error);
        alert('Failed to generate PDF');
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (date.getTime() === new Date('1970-01-01').getTime()) {
      return '';
    }
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className="report-container align-center">
      <div className="form-container">
      </div>
      <div className="table-container" id="reportContent" >
        <h2>BHEDSGOAN SAHKARI SANTHA</h2>
        {fromDate && toDate && (
          <p>{`Date from ${new Date(fromDate).toLocaleDateString('en-GB')}
           to ${new Date(toDate).toLocaleDateString('en-GB')}`}</p>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Account Code</th>
              <th>Name</th>
              <th>DateAccountOpen</th>
              <th>DateAccountClose</th>
              <th>Customer Id</th>
              <th>Account Status</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length > 0 ? (
              accounts.map((account, index) => (
                <tr key={index}>
                  <td className='account-code-column'>{account.accountCode}</td>
                  <td className="left-align">{account.name}</td>
                  <td>{formatDate(account.dateAccountOpen)}</td>
                  <td>{formatDate(account.dateAccountClose)}</td>
                  <td>{account.customerId}</td>
                  <td className="center-align">{account.accountStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary" onClick={handleDownloadPdf}>Download PDF Here</button>
     
    </div>
  );
};

export default ReportPdf;
