import { makeAutoObservable } from "mobx";

class TodoStore {
    list = []
    constructor() {
        makeAutoObservable(this)
        let data = JSON.parse(window.localStorage.getItem("todos"))
        if (data) {
            this.list = data
        }
    }

    newTask = (item) => {
        this.list.push(item)
    }

    toggleAll = (checked) => {
        this.list.forEach(item => item.completed = checked)
    }

    toggle = (id, isCompleted) => {
        this.list.find(item => item.id === id).completed = isCompleted
    }

    taskDelete = (id) => {
        this.list = this.list.filter(item => item.id !== id)
    }

    clearComplete = () => {
        this.list = this.list.filter(item => !item.completed)
    }

    get isAllToggle () {
        return this.list.every(item => item.completed)
    }

    get leftNum () {
        return this.list.filter(item => !item.completed).length
    }

    save = () => {
        window.localStorage.setItem("todos", JSON.stringify(this.list))
    }
}

export default TodoStore