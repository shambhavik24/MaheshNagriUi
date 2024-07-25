import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductPdf.css';

const ProductPdf = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromDate = searchParams.get('fromDate');
  const toDate = searchParams.get('toDate');
  const productCode = searchParams.get('productCode');
  // const accountCode = searchParams.get('accountCode');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/account/view?fromDate=${fromDate}&toDate=${toDate}&productCode=${productCode}`);
        console.log('Data fetched successfully:', response.data);
        alert('Data Displayed!!!');
        setAccounts(response.data);
      } catch (error) {
        console.error('Failed to display data!', error);
        alert('Failed to display information');
      }
    };

    if (fromDate && toDate && productCode) {
      fetchData();
    }
  }, [fromDate, toDate, productCode]);

  const handleDownloadPdf = () => {
    const input = document.getElementById('reportContent');
    html2canvas(input, { scale: 2 }) // Adjust the scale for better quality
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (date.getTime() === new Date('1970-01-01').getTime()) {
      return '';
    }
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className="product-container mt-1 mb-7">
      <div className="proform-container mt-1 mb-3" id="reportContent">
        <h2 className='mb-4'>Product Information</h2>
        <p className='para mt-1'>Product Code: {productCode}</p>
        <div className="table-container">
          <table className='table'>
            <thead>
              <tr>
                {/* <th>Product Code</th> */}
                <th>Account Code</th>
                <th>Name</th>
                <th>Date Account Open</th>
                <th>Date Account Close</th>
                <th>Customer Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 ? (
                accounts.map((account, index) => (
                  <tr key={index}>
                    {/* <td>{account.productCode}</td> */}
                    <td>{account.accountCode}</td>
                    <td className='left-align'>{account.name}</td>
                    <td>{formatDate(account.dateAccountOpen)}</td>
                    <td>{formatDate(account.dateAccountClose)}</td>
                    <td>{account.customerId}</td>
                    <td>{account.accountStatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleDownloadPdf}>Download PDF Here</button>
    </div>
  );
};

export default ProductPdf;
