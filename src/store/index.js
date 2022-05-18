import TodoStore from "./todo.store";
import React from "react";

class RootStore {
    constructor() {
        this.todoStore = new TodoStore()
    }
}

const StoreContext = React.createContext(new RootStore())

export const useStore = () => React.useContext(StoreContext)