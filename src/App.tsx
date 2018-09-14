import * as React from 'react';
import './App.css';
import List from './components/todo/List';

import { AppContextInterface, AppContextProvider, Todo } from './state/AppContext';

interface CompState {
    todos: Todo[];
}

const initState = {
    todos: [
        { text: 'First Task', checked: false },
        { text: 'Drink beer', checked: true },
        { text: 'Drink more beer', checked: false },
        { text: 'Beeeeer', checked: true },
        { text: '😀 + 🍺 = 😎', checked: false },
    ],
};

class App extends React.Component<any, CompState> {
    sampleAppContext: AppContextInterface;

    constructor(props: any) {
        super(props);
        this.state = initState;
    }

    actionTodoAdd = (todo: Todo) => {
        this.setState({
            todos: [...this.state.todos, todo],
        });
    };

    actionTodoSetChecked = (index: number, checked: boolean) => {
        let todos = [...this.state.todos];
        todos = todos.map((item, i) => {
            if (i !== index) {
                // This isn't the item we care about - keep it as-is
                return item;
            }

            // Otherwise, this is the one we want - return an updated value
            return {
                ...item,
                checked,
            };
        });

        this.setState({
            todos,
        });
    };

    actionTodoRemove = (index: number) => {
        const todos = [...this.state.todos.slice(0, index), ...this.state.todos.slice(index + 1)];
        this.setState({
            todos,
        });
    };

    public render() {
        console.log(this);
        return (
            <AppContextProvider
                value={{
                    todos: this.state.todos,
                    actions: {
                        todoAdd: this.actionTodoAdd,
                        todoSetChecked: this.actionTodoSetChecked,
                        todoRemove: this.actionTodoRemove,
                    },
                }}>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to bitsCamp</h1>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <div className="App-content">
                        <List />
                    </div>
                </div>
            </AppContextProvider>
        );
    }
}

export default App;
