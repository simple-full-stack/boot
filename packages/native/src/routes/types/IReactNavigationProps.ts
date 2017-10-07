export default interface IReactNavigationProps {
    navigation: {
        dispatch: (action: { type: string, payload: any }) => Promise<any>;
        goBack: (key: any) => void;
        navigate: (routeName: string, params?: any, action?: any) => void;
        setParams: (params: any) => void;
        state: {
            routeName: string;
            key: string;
        };
    }
}
