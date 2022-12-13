import { useEffect, useState } from 'react';
import Alert from './Alert';
import BasketList from './BasketList';
import Cart from './Cart';
// import { API_KEY, API_URL } from '../config';
import GoodsList from './GoodsList';
import Preloader from './Preloader';

export default function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');
    useEffect(() => {
        fetch('https://fortniteapi.io/v2/shop?lang=ru', {
            headers: { Authorization: '0696d5fc-91083413-a1a47d6f-1fa9665c' },
        })
            .then((res) => res.json())
            .then((data) => {
                data.shop && setGoods(data.shop);
                setLoading(false);
            });
    }, []);

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    };

    const closeAlert = () => {
        setAlertName('');
    };

    const removeFromBasket = (id) => {
        const newOrder = order.filter((el) => el.mainId !== id);
        setOrder(newOrder);
    };
    const minusQuantity = (id) => {
        const newOrder = order.map((el) => {
            if (el.mainId === id) {
                if (el.quantity < 1) {
                    el.quantity = 0;
                    return el;
                } else {
                    el.quantity = el.quantity - 1;
                    return el;
                }
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

    const plusQuantity = (id) => {
        const newOrder = order.map((el) => {
            if (el.mainId === id) {
                el.quantity = el.quantity + 1;
                return el;
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

    const addOrder = (item) => {
        const itemIndex = order.findIndex((el) => el.mainId === item.mainId);
        if (itemIndex < 0) {
            const newItem = { ...item, quantity: 1 };
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((el, i) => {
                if (i === itemIndex) {
                    return {
                        ...el,
                        quantity: el.quantity + 1,
                    };
                } else {
                    return el;
                }
            });
            setOrder(newOrder);
        }
        setAlertName(item.displayName);
    };
    return (
        <main className='container content'>
            <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
            {loading ? (
                <Preloader />
            ) : (
                <GoodsList goods={goods} addOrder={addOrder} />
            )}
            {isBasketShow && (
                <BasketList
                    order={order}
                    removeFromBasket={removeFromBasket}
                    handleBasketShow={handleBasketShow}
                    minusQuantity={minusQuantity}
                    plusQuantity={plusQuantity}
                />
            )}
            {alertName && (
                <Alert displayName={alertName} closeAlert={closeAlert} />
            )}
        </main>
    );
}
