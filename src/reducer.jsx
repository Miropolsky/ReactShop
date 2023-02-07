export function reducer(state, { type, payload }) {
    switch (type) {
        case 'SET_GOODS':
            return {
                ...state,
                goods: payload,
                loading: false,
            };
        case 'HANDLE_BASKET_SHOW':
            return { ...state, isBasketShow: !state.isBasketShow };
        case 'CLOSE_ALERT':
            return { ...state, alertName: '' };
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                order: state.order.filter((el) => el.mainId !== payload.id),
            };
        case 'MINUS_QUANTITY':
            return {
                ...state,
                order: state.order.map((el) => {
                    if (el.mainId === payload.id) {
                        if (el.quantity < 1) {
                            el.quantity = 0;
                            return el;
                        } else {
                            el.quantity = el.quantity - 0.5;
                            return el;
                        }
                    } else {
                        return el;
                    }
                }),
            };
        case 'PLUS_QUANTITY':
            return {
                ...state,
                order: state.order.map((el) => {
                    if (el.mainId === payload.id) {
                        el.quantity += 0.5;
                        return el;
                    } else {
                        return el;
                    }
                }),
            };
        case 'ADD_ORDER': {
            const itemIndex = state.order.findIndex(
                (el) => el.mainId === payload.mainId
            );
            let newOrder = null;
            if (itemIndex < 0) {
                const newItem = { ...payload, quantity: 1 };
                newOrder = [...state.order, newItem];
            } else {
                newOrder = state.order.map((el, i) => {
                    if (i === itemIndex) {
                        return {
                            ...el,
                            quantity: el.quantity + 1,
                        };
                    } else {
                        return el;
                    }
                });
            }
            return {
                ...state,
                order: newOrder,
                alertName: payload.displayName,
            };
        }

        default:
            return state;
    }
}
