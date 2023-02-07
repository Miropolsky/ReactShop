import { useReducer } from 'react';
import { createContext } from 'react';
import { reducer } from './reducer';
export const ShopContext = createContext();

const initialState = {
    goods: [],
    loading: true,
    order: [],
    isBasketShow: false,
    alertName: '',
};

export const ContextProvider = ({ children }) => {
    const [value, dispatch] = useReducer(reducer, initialState);
    value.handleBasketShow = () => {
        dispatch({ type: 'HANDLE_BASKET_SHOW' });
    };
    value.closeAlert = () => {
        dispatch({ type: 'CLOSE_ALERT' });
    };
    value.removeFromBasket = (itemId) => {
        dispatch({ type: 'REMOVE_FROM_BASKET', payload: { id: itemId } });
    };
    value.minusQuantity = (itemId) => {
        dispatch({ type: 'MINUS_QUANTITY', payload: { id: itemId } });
    };
    value.plusQuantity = (itemId) => {
        dispatch({ type: 'PLUS_QUANTITY', payload: { id: itemId } });
    };
    value.addOrder = (item) => {
        dispatch({ type: 'ADD_ORDER', payload: item });
    };

    value.setGoods = (data) => {
        dispatch({ type: 'SET_GOODS', payload: data });
    };
    return (
        <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
    );
};
