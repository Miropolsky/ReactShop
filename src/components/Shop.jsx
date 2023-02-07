import { useContext, useEffect } from 'react';
import { ShopContext } from '../context';
import Alert from './Alert';
import BasketList from './BasketList';
import Cart from './Cart';
// import { API_KEY, API_URL } from '../config';
import GoodsList from './GoodsList';
import Preloader from './Preloader';

export default function Shop() {
    const { setGoods, loading, isBasketShow, alertName } =
        useContext(ShopContext);

    useEffect(() => {
        fetch('https://fortniteapi.io/v2/shop?lang=ru', {
            headers: { Authorization: '0696d5fc-91083413-a1a47d6f-1fa9665c' },
        })
            .then((res) => res.json())
            .then((data) => {
                setGoods(data.shop);
            });
        //eslint-disable-next-line
    }, []);

    return (
        <main className='container content'>
            <Cart />
            {loading ? <Preloader /> : <GoodsList />}
            {isBasketShow && <BasketList />}
            {alertName && <Alert />}
        </main>
    );
}
