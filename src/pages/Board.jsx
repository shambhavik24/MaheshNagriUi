import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import './Board.css'

const Board = () => {
    const [numberId, setNumberId] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [boards, setBoards] = useState([]);
    const [nextId, setNextId] = useState(1)


    const addTable = () =>{

        const newBoard = {numberId: nextId, name, description}
        setBoards([...boards, newBoard])
        setNextId(nextId+1)
        setNumberId('')
        setName('')
        setDescription('')
    };


    const submitHandler = async () =>{
        e.preventDefault();


        try{
            const response = await axios.post(`http://localhost:8082/boards`,boards)
            console.log("Data added sucessfully", response);
            alert('Data added sucessfully');  

            const newBoardData = response.data
            
            setBoards([...boards, newBoardData]);
            setNextId(nextId+1)
        }
        catch(error){
            console.error('Failed to add the data', error);
            alert('Failed to add information');

        }
    }


  return (
    <div className="board-group" >
        <form className='board-form' onSubmit={submitHandler}>
            <h2 className='header'>List of boards</h2>

            <div className="form-group">
                    <label htmlFor='boardId'>Number</label>
                    <input
                        type='number'
                        value={numberId}
                        onChange={(e) => setNumberId(e.target.value)}
                        id='boardId'
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor='name'>Name</label>
                    <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id='name'
                    className='form-input'

                    />
                </div>

                <div className="form-group">
                    <label htmlFor='description'>Description</label>
                    <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button type='submit' onClick={addTable}>Add</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                    {boards.map((board, index) => (
                        <tr key={index}>
                            <td>{board.numberId}</td>
                            <td>{board.name}</td>
                            <td>{board.description}</td>
                        </tr>
                    ))}
                </tbody>
        </table>
        <button type='submit' onClick={submitHandler}>Submit</button>


    </div>
  )
}

export default Board
