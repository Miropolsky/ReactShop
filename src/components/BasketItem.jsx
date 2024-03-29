import { useContext } from 'react';
import { ShopContext } from '../context';

export default function BasketItem(props) {
    const { mainId, displayName, price, quantity } = props;
    const { minusQuantity, plusQuantity, removeFromBasket } =
        useContext(ShopContext);
    return (
        <li className='collection-item'>
            {`${displayName} `}
            <i
                className='material-icons znak'
                onClick={() => minusQuantity(mainId)}
                style={{ fontSize: '16px' }}
            >
                remove
            </i>
            {` x${quantity} `}
            <i
                className='material-icons znak'
                onClick={() => plusQuantity(mainId)}
                style={{ fontSize: '16px' }}
            >
                add
            </i>
            ={price * quantity}
            <span href='#!' className='secondary-content'>
                <i
                    className='material-icons basket-delete'
                    onClick={() => removeFromBasket(mainId)}
                >
                    close
                </i>
            </span>
        </li>
    );
}
