import * as React from 'react';
import { List } from 'antd';
import NewTodo from './NewTodo'
import Counter from './Counter'
import TodoEntry from './TodoEntry';

import { AppContextInterface, withAppContext, Todo } from '../../state/AppContext';


interface Props {
    appContext: AppContextInterface
}

class TodoList extends React.PureComponent<Props> {
    handleTodoChecked = (index: number, checked: boolean) => {
        this.props.appContext.actions.setCheckedTodo(index, checked);
    };
    handleTodoDelete = (index: number) => {
        this.props.appContext.actions.removeTodo(index);
    }
    renderTodoEntry = (todo: Todo, index: number) => {
        return (
            <List.Item>
                <TodoEntry key={index} todo={todo} index={index} 
                onChange={this.handleTodoChecked} 
                onDelete={this.handleTodoDelete}
                />
            </List.Item>
        );
    };
    render() {
        const { todos } = this.props.appContext;
        return (
            <List
                header={<div><Counter /></div>}
                footer={<div><NewTodo /></div>}
                bordered={true}
                itemLayout="horizontal"
                dataSource={todos}
                renderItem={this.renderTodoEntry}
            />
        );
    }
}
export default withAppContext(TodoList);

