import * as React from 'react';
import { AppContextInterface, withAppContext } from '../state/AppContext';

interface PropsFromState {
    appContext: AppContextInterface;
}

class Title extends React.PureComponent<PropsFromState> {
    render() {
        return (
            <header className={'App-header theme-' + this.props.appContext.theme}>
                <h1 className="App-title">Welcome to bitsCamp</h1>
            </header>
        );
    }
}

export default withAppContext(Title);
