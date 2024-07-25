import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GLAccount.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from 'sweetalert2'; 

const GLAccount = () => {
    const [glAccounts, setGlAccounts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isEditing, setIsEditing] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

    const rowsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/glaccounts/All');
                const glData = response.data.map((account, index) => ({ ...account, glNumber: index + 1 }));
                setGlAccounts(glData);
                console.log(glData);
                console.log('Data displayed successfully');
            } catch (error) {
                console.error('Error fetching user data', error);
                alert("Error fetching data");
            }
        };

        fetchData();
    }, []);

    const handleMarkingChange = (index, value) => {
        value = value.toUpperCase(); // Convert to uppercase
        if (value === "Y" || value === "N" || value === "") {
            const updatedAccounts = [...glAccounts];
            updatedAccounts[index].marking = value;
            setGlAccounts(updatedAccounts);
        }
    };

    const handleEditClick = (index) => {
        setIsEditing({ ...isEditing, [index]: true });
    };

    const handleSaveClick = async (index) => {
        const updatedAccount = glAccounts[index];
        try {
            console.log(updatedAccount);
            await axios.put(`http://localhost:8081/glaccounts/update`, {
                marking: updatedAccount.marking,
                glCode: updatedAccount.glCode,
                description: updatedAccount.description
            });
            setIsEditing({ ...isEditing, [index]: false });
            Swal.fire({
                title: 'Success!',
                text: 'Marking updated successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.log('Error updating data', error);
            alert('Error updating data');
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.floor(glAccounts.length / rowsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedAccounts = glAccounts.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    const handleKeyPress = (event) => {
        const charCode = event.charCode;
        const charStr = String.fromCharCode(charCode);
        if (!/[YN]/.test(charStr)) {
            event.preventDefault();
        }
    };

    return (
        <div className={`glaccount-container ${isSidebarOpen ? 'open' : 'closed'} mt-6`}>
            <p className="h3 text-center mb-4">EXPENSES-INCOME MARKING</p>
            <div className="table-container">
                <div className="table-responsive ml-10 mr-2">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Sr.No</th>
                                <th>GL Code</th>
                                <th>Description</th>
                                <th>Marking</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedAccounts.map((account, index) => (
                                <tr key={account.glCode} className={index % 2 === 0 ? "table-light" : "table-secondary"}>
                                    <td>{account.glNumber}</td>
                                    <td>{account.glCode}</td>
                                    <td className='left-align'>{account.description}</td>
                                    <td>
                                        {isEditing[currentPage * rowsPerPage + index] ? (
                                            <div className="d-flex align-items-center">
                                                <input
                                                    type="text"
                                                    className="form-control mr-2 edit-placeholder"
                                                    value={account.marking}
                                                    onChange={(e) => handleMarkingChange(currentPage * rowsPerPage + index, e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    maxLength="1" // Restrict input to 1 character
                                                />
                                                <button className="btn btn-primary" onClick={() => handleSaveClick(currentPage * rowsPerPage + index)}>Save</button>
                                            </div>
                                        ) : (
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">{account.marking}</span>
                                                <i className="fas fa-edit" style={{ cursor: 'pointer' }} onClick={() => handleEditClick(currentPage * rowsPerPage + index)}></i>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary" onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</button>
                    <button className="btn btn-outline-primary" onClick={handleNextPage} disabled={(currentPage + 1) * rowsPerPage >= glAccounts.length}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default GLAccount;
