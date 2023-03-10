import React, { useState, useEffect } from 'react'
import "./style.css"

// Get localStorage Data Back

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists)
    } else {
        return [];
    }
}

const TodoList = () => {
    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getLocalData())

    const addItem = () => {
        if (!inputData) {
            alert('Fill the block')
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myNewInputData])
            setInputData("")
        }
    };
    // DELETE ITEM-----
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index
        });
        setItems(updatedItems)
    }

    const removeAll = () => {
        setItems([]);
    }

    // Adding Local Storage

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items])


    return (
        <>
            <div className='main-div'>
                <div className='child-div' >
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here✍</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='  ✍ Add Items ...'
                            className='form-control'
                            value={inputData} onChange={(event) => setInputData(event.target.value)} />
                        <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    </div>
                    {/* Show Our Todo item */}

                    <div className='showItems'>
                        {
                            items.map((curElem) => {
                                return (
                                    <div className='eachItem' key={curElem.id}>
                                        <h3>{curElem.name}</h3>
                                        <div className='todo-btn'>
                                            <i className="far fa-edit add-btn"></i>
                                            <i className="far fa-trash-alt add-btn"
                                                onClick={() => deleteItem(curElem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })};
                    </div>
                    {/* Remove All Button... */}
                    <div className='showItems'>
                        <button className='btn effect04'
                            data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList
