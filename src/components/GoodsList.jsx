import { useContext } from 'react';
import GoodsItem from './GoodsItem';
import { ShopContext } from './../context';

export default function GoodsList() {
    const { goods } = useContext(ShopContext);
    if (!goods.length) {
        return <h3>Нет товаров</h3>;
    }
    return (
        <div className='goods'>
            {goods.map((item) => {
                return <GoodsItem key={item.mainId} {...item} />;
            })}
        </div>
    );
}
