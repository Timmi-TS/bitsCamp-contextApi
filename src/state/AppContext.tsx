import * as React from 'react';

export interface Todo {
    text: string;
    checked: boolean;
}

interface AppContextActions {
    todoAdd(todo: Todo): void;
    todoSetChecked(index: number, checked: boolean): void;
    todoRemove(index: number): void;
}

export interface AppContextInterface {
    todos: Todo[];
    actions: AppContextActions;
}

const ctxt = React.createContext<AppContextInterface | null>(null);

export const AppContextProvider = ctxt.Provider;

export const AppContextConsumer = ctxt.Consumer;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withAppContext<P extends { appContext?: AppContextInterface }, R = Omit<P, 'appContext'>>(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
    return function BoundComponent(props: R) {
        return <AppContextConsumer>{value => <Component {...props} appContext={value} />}</AppContextConsumer>;
    };
}
