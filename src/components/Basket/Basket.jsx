import { useContext, useEffect, useState } from "react"
import { CardContext } from "../../context/cardContext"
import Card from "../Card/card"
import CardList from "../CardList/card-list"



export const Basket = () => {
    const [basketItems, setBasketItems] = useState([]);

    const { basket, setBasket } = useContext(CardContext);

    useEffect(() => {
        const inBasket = basket.reduce((acc, el) => {
            const findElem = acc.find(e => e.product._id === el._id);
            if (!findElem) {
                return [...acc, { product: el, count: 1 }]
            } else {
                const arr = acc.map(accElement => {
                    if (accElement.product._id === findElem.product._id) {
                        return { ...findElem, count: findElem.count + 1 }
                    }
                    return accElement
                })
                return [...arr]
            }
        }, [])

        console.log({ inBasket });
        setBasketItems(inBasket)
    }, [basket])


    console.log({ basket });

    return <>
        {!!basket.length && basket.map((b, i) => (<Card key={i} product={b} {...b} onProductLike={() => { }} />))}
    </>
}