import * as React from 'react';
import { Badge } from 'antd';
import { AppContextInterface, withAppContext } from '../../state/AppContext';

interface PropsFromState {
    appContext: AppContextInterface;
}

class Counter extends React.PureComponent<PropsFromState> {
    getCheckedCount() {
        let checked: number = 0;
        let unchecked: number = 0;

        this.props.appContext.todos.forEach(t => {
            if (t.checked) {
                checked++;
            } else {
                unchecked++;
            }
        });

        return { checked, unchecked };
    }

    render() {
        let { checked, unchecked } = this.getCheckedCount();
        return (
            <div>
                <span style={{ marginRight: 10 }}>
                    Todo <Badge count={checked} showZero={true} />
                </span>
                |
                <span style={{ marginLeft: 10 }}>
                    Done <Badge count={unchecked} showZero={true} style={{ backgroundColor: '#52c41a' }} />
                </span>
            </div>
        );
    }
}

export default withAppContext(Counter);
