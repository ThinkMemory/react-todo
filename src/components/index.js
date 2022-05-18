import React, {useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import uuid from "react-uuid"

import './index.css'

function Todo () {
    const { todoStore } = useStore()

    const [newTask, setNewTask] = useState('')
    const [filter, setFilter] = useState(0)

    useEffect(() => {
        window.onbeforeunload = () => {
            todoStore.save()
        }
    }, [])

    function filterList () {
        if (filter === 0) {
            return todoStore.list
        } else if (filter === 1) {
            return todoStore.list.filter(item => !item.completed)
        } else {
            return todoStore.list.filter(item => item.completed)
        }
    }

    function handleNew(e) {
        if (e.keyCode === 13) {
            todoStore.newTask({
                id: uuid(),
                task: newTask,
                completed: false
            })
            setNewTask('')
        }
    }

    function handleToggleAll (checked) {
        todoStore.toggleAll(checked)
    }

    function handleToggle (e, id) {
        todoStore.toggle(id, e.target.checked)
    }

    function handleDestroy (id) {
        todoStore.taskDelete(id)
    }

    function handleClear () {
        todoStore.clearComplete()
    }

    return (
        <section className="todo-app">
            <header>
                <h1>TODOS</h1>
                <input className="new-todo"
                       type="text" placeholder="What needs to be done?"
                       value={newTask}
                       onChange={(e) => setNewTask(e.target.value)}
                       onKeyUp={(e) => handleNew(e)}
                       autoFocus />
            </header>

            <section className="todo-main">
                <input type="checkbox"
                       className={todoStore.list.length ? "toggle-all" : "hidden"}
                       checked={todoStore.isAllToggle}
                       onChange={(e) => handleToggleAll(e.target.checked)} />
                <ul className="todo-list">
                    {filterList().map(item => (
                        <li className="todo-item" key={item.id}>
                            <div>
                                <input className="toggle"
                                       type="checkbox"
                                       onChange={(e) => handleToggle(e, item.id)}
                                       checked={item.completed} />
                                <label className={item.completed ? "todo-label completed": "todo-label"}>{item.task}</label>
                                <button className="destroy" onClick={() => handleDestroy(item.id)} />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <footer className={todoStore.list.length ? "footer" : "hidden"}>
                <span className="todo-count">{todoStore.leftNum} items left</span>
                <ul className="filters">
                    <li>
                        <a href className={filter === 0 ? "selected" : ""}
                           style={{cursor: "pointer"}}
                           onClick={() => setFilter(0)}>All</a>
                    </li>
                    <li><a href className={filter === 1 ? "selected" : ""}
                           style={{cursor: "pointer"}}
                           onClick={() => setFilter(1)}>Active</a></li>
                    <li><a href className={filter === 2 ? "selected" : ""}
                           style={{cursor: "pointer"}}
                           onClick={() => setFilter(2)}>Completed</a></li>
                </ul>
                <button className={todoStore.list.length > todoStore.leftNum ? "clear-completed" : "hidden"}
                        onClick={handleClear}>Clear completed</button>
            </footer>
        </section>
    )
}

export default observer(Todo)