import * as React from 'react';
import { Todo } from '../../state/AppContext';
import {  Button } from 'antd';

interface ParentProps {
    todo: Todo;
    index: number;
    onChange(index: number, checked: boolean): void;
    onDelete(index: number): void;
}

type Props = ParentProps;

class TodoEntry extends React.PureComponent<Props> {
    handleCheckboxChange = () => {
        this.props.onChange(this.props.index, !this.props.todo.checked);
    };

    handleDelete = () => {
        this.props.onDelete(this.props.index);
    };

    render() {
        const { todo } = this.props;
        const { checked } = todo;

        let style = {};
        if (checked) {
            style = {
                textDecoration: 'line-through',
                color: '#a0a0a0',
            };
        }

        return (
            <div style={style}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={this.handleCheckboxChange}
                    style={{ marginRight: 10 }}
                />
                <Button type="danger" shape="circle" size="small" icon="delete" style={{ marginRight: 10 }} onClick={this.handleDelete}  />

                {todo.text}
            </div>
        );
    }
}

export default TodoEntry;
