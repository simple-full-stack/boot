declare module 'dva' {
    export { connect } from 'react-redux';
    import * as React from 'react';

    interface Model {
        namespace: string;
        reducers: object
    }

    interface DVA {
        model: (options: any) => void,
        router: (config: any) => void;
        start: (id: string) => void;
        use: (...args: any[]) => void;
    }

    export default function (): DVA;
}

declare module 'dva/router' {
    export { Router, Route, RouteComponentProps } from 'react-router';
}
