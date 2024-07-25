import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PreviousParent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const meetingDate = searchParams.get('meetingDate');
  const [parents, setParents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/meeting/meetDate?meetingDate=${meetingDate}`);
        console.log('Data fetched successfully:', response.data);
        alert('Data Displayed!!!');
        setParents(response.data);
      } catch (error) {
        console.error('Failed to display data!', error);
        alert('Failed to display information');
      }
    };

    if (meetingDate) {
      fetchData();
    }
  }, [meetingDate]);


  const handleDownloadPdf = () => {
    const input = document.getElementById('reportContent');
    html2canvas(input, { scale: 2 }) 
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
        console.error('Failed to generate PDF', error);
        alert('Failed to generate PDF');
      });
  };





  return (
    <div className="meeting-container mt-1 mb-3" >
      <div className="table-container mb-1" id='reportContent'>
      <h2 className=''>Previous Date Data</h2>
        <table className="table table-striped">

          <thead>
            <tr>
              <th>Meeting-Date</th>
              <th>Meeting-Time</th>
              <th>Meeting Venue</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {parents.length > 0 ? (
              parents.map((parent, index) => (
                <tr key={index}>
                  <td>{parent.meetingDate}</td>
                  <td>{parent.meetingTime}</td>
                  <td className=''>{parent.meetingVenue}</td>
                  <td>{parent.name}</td>
                  <td>{parent.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
      <button className="btn btn-primary" onClick={handleDownloadPdf}>Download PDF Here</button>
    </div>
  );
};

export default PreviousParent;
