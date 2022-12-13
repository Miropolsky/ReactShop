export default function GoodsItem(props) {
    const {
        mainId,
        displayName,
        displayDescription,
        price,
        granted,
        addOrder = Function.prototype,
    } = props;
    return (
        <div className='card'>
            <div className='card-image'>
                <img
                    src={granted[0].images.full_background}
                    alt={displayName}
                />
            </div>
            <div className='card-content'>
                <span className='card-title'>Card Title</span>
                <p>{displayDescription}</p>
            </div>
            <div className='card-action'>
                <button
                    onClick={() =>
                        addOrder({
                            mainId,
                            displayName,
                            price: price.finalPrice,
                        })
                    }
                    className='btn blue darken-1'
                >
                    Купить
                </button>
                <span className='right' style={{ fontSize: '1.6rem' }}>
                    {price.finalPrice} руб.
                </span>
            </div>
        </div>
    );
}
