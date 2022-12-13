import GoodsItem from './GoodsItem';

export default function GoodsList({
    goods = [],
    addOrder = Function.prototype,
}) {
    if (!goods.length) {
        return <h3>Нет товаров</h3>;
    }
    return (
        <div className='goods'>
            {goods.map((item) => {
                return (
                    <GoodsItem
                        addOrder={addOrder}
                        key={item.mainId}
                        {...item}
                    />
                );
            })}
        </div>
    );
}
