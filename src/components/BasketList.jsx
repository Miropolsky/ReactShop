import BasketItem from './BasketItem';

export default function BasketList(props) {
    const {
        order,
        handleBasketShow = Function.prototype,
        removeFromBasket = Function.prototype,
        minusQuantity = Function.prototype,
        plusQuantity = Function.prototype,
    } = props;
    const totalPrice = order.reduce((sum, cur) => {
        return sum + cur.price * cur.quantity;
    }, 0);
    return (
        <ul className='collection basket-list'>
            <li className='collection-item active'>Корзина</li>
            {order.length ? (
                order.map((el) => (
                    <BasketItem
                        key={el.mainId}
                        {...el}
                        removeFromBasket={removeFromBasket}
                        minusQuantity={minusQuantity}
                        plusQuantity={plusQuantity}
                    />
                ))
            ) : (
                <li className='collection-item '>Корзина пуста</li>
            )}
            <li className='collection-item active' style={{ height: '3.6rem' }}>
                Общая стоимость: {totalPrice} руб.
                <button className='right #00695c teal darken-3 btn-small btnOf'>
                    Оформить
                </button>
            </li>
            <i
                className='material-icons basket-close'
                onClick={handleBasketShow}
            >
                close
            </i>
        </ul>
    );
}
