import * as React from 'react';
import './App.css';
import List from './components/todo/List';
import ThemeSwitch from './components/ThemeSwitch';
import Title from './components/Title';

import { AppContextInterface, AppContextProvider, Todo, Theme } from './state/AppContext';

interface CompState {
    todos: Todo[];
    theme: Theme;
}

const initState = {
    todos: [
        { text: 'First Task', checked: false },
        { text: 'Drink beer', checked: true },
        { text: 'Drink more beer', checked: false },
        { text: 'Beeeeer', checked: true },
        { text: '😀 + 🍺 = 😎', checked: false },
    ],
    theme: Theme.dark,
};

class AppProvider extends React.PureComponent<any, CompState> {
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

    actionSetTheme = (theme: Theme) => {
        this.setState({
            theme,
        });
    };

    public render() {
        return (
            <AppContextProvider
                value={{
                    todos: this.state.todos,
                    theme: this.state.theme,
                    actions: {
                        addTodo: this.actionTodoAdd,
                        setCheckedTodo: this.actionTodoSetChecked,
                        removeTodo: this.actionTodoRemove,
                        setTheme: this.actionSetTheme,
                    },
                }}>
                <App />
            </AppContextProvider>
        );
    }
}

export default AppProvider;

class App extends React.PureComponent<any> {
    render() {
        console.log('render App');
        console.log(this);

        return (
            <div className="App">
                <Title />
                <div className="App-content">
                    <List />
                    <ThemeSwitch />
                </div>
            </div>
        );
    }
}
