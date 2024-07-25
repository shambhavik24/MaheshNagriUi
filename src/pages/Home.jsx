// import React, { useEffect, useRef, useState } from 'react';
// import { Chart } from 'chart.js/auto';
// import axios from 'axios';

// const App = () => {
//   const chartRef = useRef(null);
//   const [chartData, setChartData] = useState([]);
//   const [chartInstance, setChartInstance] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8084/home/graph');
//         console.log("Data displayed", response.data);
//         setChartData(response.data); // Assuming response.data contains the data array
//       } catch (error) {
//         console.log('Failed to fetch data');
//         alert('Failed to fetch data');
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (chartData.length === 0 || !chartRef.current) return;

//     if (chartInstance) {
//       chartInstance.destroy();
//     }

//     const labels = ['loan', 'deposits', 'investment', 'npa', 'overDue', 'reserveFund', 'sharesCapital',
//       'bankBalance', 'cashBalance', 'members', 'cdRatio', 'sLR'];

//     const maxDataValue = Math.max(...chartData);
//     const myChartRef = chartRef.current.getContext("2d");
//     const newChartInstance = new Chart(myChartRef, {
//       type: "bar",
//       data: {
//         labels,
//         datasets: [{
//           label: 'Data percentage',
//           data: chartData, // Assuming chartData is an array of numeric values from your API response
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1.6
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             max: Math.ceil(maxDataValue / 10) * 10 // Adjust the maximum value based on your data
//           }
//         }
//       }
//     });

//     setChartInstance(newChartInstance);

//     return () => {
//       if (chartInstance) {
//         chartInstance.destroy();
//       }
//     };
//   }, [chartData]);

//   return (
//     <div>
//       <h1>Chairman Dashboard</h1>
//       <canvas ref={chartRef} width="800" height="400" />
//     </div>
//   );
// };

// export default App;.
// import React, { useEffect, useRef } from 'react';
// import { Chart } from 'chart.js/auto';

// const App = () => {
//   const chartRef = useRef(null);
//   let chartInstance = null;

//   useEffect(() => {
//     const myChartRef = chartRef.current.getContext("2d");

//     if (chartInstance) {
//       chartInstance.destroy();
//     }

//     chartInstance = new Chart(myChartRef, {
//       type: "bar",
//       data: {
//         labels: ['Loan', 'Deposit', 'Investment', 'NPA', 'Overdue','reserve funds', 'Share Capital', 
//           'Bank balance','cash balance','Share balance','members','cdRatio','SLR'],
//         datasets: [{
//           label: 'Sample Data',

//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1
//         }]
//       }, 
//     });

//     return () => {
//       if (chartInstance) {
//         chartInstance.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Chairman Dash Board</h1>
//       <canvas ref={chartRef} width="800" height="400" /> {/* Adjusted canvas size */}
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';


// const App = () => {
//   const chartRef = useRef(null);
//   const [chartData, setChartData] = useState({
//     labels: ['loan', 'deposits', 'investment', 'npa', 'overDue', 'reserveFund', 'sharesCapital', 
//       'bankBalance', 'cashBalance', 'shareBalance', 'members', 'cdRatio', 'sLR'],
//     datasets: [{
//       label: 'Sample Data',
//       data: [], 
//       backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 1
//     }]
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8084/home/graph'); 
//         const data = response.data;

//         setChartData(prevState => ({
//           ...prevState,
//           datasets: [{
//             ...prevState.datasets[0],
//             data: data 
//           }]
//         }));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const myChartRef = chartRef.current.getContext("2d");
//     let chartInstance = null;

//     if (chartInstance) {
//       chartInstance.destroy();
//     }

//     chartInstance = new Chart(myChartRef, {
//       type: "bar",
//       data: chartData,
//       options: {
   
//       }
//     });

//     return () => {
//       if (chartInstance) {
//         chartInstance.destroy();
//       }
//     };
//   }, [chartData]);

//   return (
//     <div>
//       <h1>Chairman Dashboard</h1>
//       <canvas ref={chartRef} width="800" height="400" /> 
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useRef, useState } from 'react';


const Home = () => {
  // server
  const [data, setData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: ['Loan', 'Deposits', 'Investment', 'Npa', 'OverDue', 'ReserveFund', 'SharesCapital', 
      'BankBalance', 'CashBalance', 'Members', 'Cd-Ratio', 'SLR'],
    datasets: [{
      label: 'Financial Data',
      data: [], 
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  });

  //server
  useEffect(() => {
    fetch(`${apiUrl}/home`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [apiUrl]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8084/home/alldata'); 
        const data = response.data[0]; 

        const dataValues = [
          data.loan, data.deposits, data.investment, data.npa, data.overDue, data.reserveFund,
          data.sharesCapital, data.bankBalance, data.cashBalance, data.sharesCapital, data.members,
          data.cdRatio, data.sLR
        ];

        setChartData(prevState => ({
          ...prevState,
          datasets: [{
            ...prevState.datasets[0],
            data: dataValues 
          }]
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    let chartInstance = null;

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(myChartRef, {
      type: "bar",
      data: chartData,
      options: {
       
      }
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartData]);

  return (
    <div>
      <h1>Chairman Dashboard</h1>
      //server
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}

      <canvas ref={chartRef} width="800" height="400" /> 
    </div>
  );
};

export default Home;
