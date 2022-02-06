import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TodoList.css'

const TodoList = () => {
    const [todoData, setTodoData] = useState([]);
    const [currentPage, setCurrentPages] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(5);

    useEffect(() => {
        axios.get("http://localhost:5000/employees")
            .then(res => setTodoData(res.data))
    }, [])
    // console.log(todoData);

    // const pages = [];
    // for (let i = 0; i <= Math.ceil(todoData.length / dataPerPage); i++) {
    //     pages.push(i);        
    // }

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentDatas = todoData.slice(indexOfFirstData, indexOfLastData)
    // console.log(currentDatas);

    const handlePrev = () => {
        setCurrentPages(currentPage - 1)
        if ((currentPage - 1) === 0) {
            setCurrentPages(1)
        }
    }

    const handleNext = (event) => {
        // setCurrentPages(currentPage + 1)
        // console.log(currentDatas.length === 0);
        console.log(currentDatas.length);
        // // console.log(;
        if (currentDatas.length === 5 ) {
            setCurrentPages(currentPage + 1)
        }
        else if (currentDatas.length < 3) {
            setCurrentPages(currentPage)
            // event.stopImmediatePropagation();
        }
        else {
            setCurrentPages(currentPage)
            event.stopImmediatePropagation();
        }
        //  else if (Math.ceil((currentPage + 1) / 5) < currentDatas.length) {
        //     // setCurrentPages(currentPage + 1)
        // }

        // switch (currentDatas.length === 0) {
        //     default:
        //         setCurrentPages(currentPage + 1)
        //         break;
        //     case 0:
        //         setCurrentPages(1);
        //         break;
        // }

    }

    return (
        <div className="todo">
            <Table className='styled-table'>
                <thead>
                    <tr>
                        <th>Fast Name</th>
                        <th>Last Name</th>
                        <th>Gmail</th>
                        <th>Send Mail</th>
                    </tr>
                </thead>
                {
                    currentDatas.map((todo, index) =>
                        <tbody key={index}>
                            <tr>
                                <td>{todo.fastName}</td>
                                <td>{todo.lastName}</td>
                                <td>{todo.email}</td>
                                <td><Link className='btn btn-success' to="/sendEmail">Send Email</Link></td>
                            </tr>
                        </tbody>
                    )
                }

                <div>
                    <button onClick={handlePrev}>Prev</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            </Table>
        </div>
    );
};

export default TodoList;