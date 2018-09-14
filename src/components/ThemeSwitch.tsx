import * as React from 'react';
import { Switch } from 'antd';
import { AppContextInterface, withAppContext, Theme } from '../state/AppContext';

interface PropsFromState {
    appContext: AppContextInterface;
}

class ThemeSwitch extends React.PureComponent<PropsFromState> {
    onChangeTheme = (checked: boolean) => {
        const theme = checked ? Theme.dark : Theme.light;
        this.props.appContext.actions.setTheme(theme);
    };
    render() {
        return (
            <div className="theme-switch">
            <span style={{marginRight: 10}}>Theme:</span> 
                <Switch
                    checkedChildren={Theme.dark}
                    unCheckedChildren={Theme.light}
                    checked={this.props.appContext.theme === Theme.dark}
                    onChange={this.onChangeTheme}
                />
            </div>
        );
    }
}

export default withAppContext(ThemeSwitch);
