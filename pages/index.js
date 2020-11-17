import Head from "next/head";
import styled from "styled-components";
import { useReducer } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { cartState, cartCountState, cartTotalState } from "../components/state";

const ITEMS = [
  {
    name: "Air Jordan 1 Pine Green",
    price: 200,
    seller: "Joe Brown",
    stock: 5,
  },
  {
    name: "Air Jordan 1 Pine Green",
    price: 205,
    seller: "John Deere",
    stock: 1,
  },
  {
    name: "Air Jordan 1 Pine Green",
    price: 200,
    seller: "Joe Apple",
    stock: 2,
  },
  {
    name: "Air Jordan 1 Pine Green",
    price: 200,
    seller: "Joey Joe",
    stock: 4,
  },
];

const HeaderStyled = styled.header`
  position: fixed;
  height: 72px;
  width: 100%;
  padding: 0 2rem;
  top: 0;
  z-index: 10;

  div {
    margin: auto;
    max-width: 1400px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  span {
    font-weight: 500;
  }
`;

const ItemStyled = styled.div`
  border: 1px solid #f3f3f3;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  margin: 1rem;
  padding: 1rem;
`;

const ItemContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  margin: auto;
  margin-top: 100px;
`;

const reducer = (state, { type, item }) => {
  switch (type) {
    case "addToCart":
      return state.map((itm) =>
        item.seller === itm.seller
          ? {
              ...item,
              stock: item.stock - 1,
            }
          : itm
      );
    default:
      return state;
  }
};

const Home = () => {
  // const cartCount = useRecoilValue(cartCountState);
  const cartTotal = useRecoilValue(cartTotalState);
  const [cart, setCart] = useRecoilState(cartState);
  const [items, dispatch] = useReducer(reducer, ITEMS);

  const addToCart = (item) => {
    // Set cart state
    setCart([...cart, item]);

    // Update items state
    dispatch({ type: "addToCart", item });
  };

  return (
    <div className="container">
      <Head>
        <title>Next-Recoil-Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderStyled>
        <div>
          {/* <span>items in cart {cartCount} </span> */}
          <h3>Market</h3>
          <span>Total ${cartTotal}</span>
        </div>
      </HeaderStyled>
      <main>
        <ItemContainerStyled>
          {items.map((item, index) => {
            const inStock = item.stock !== 0;

            return (
              <ItemStyled key={index}>
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Stock: {item.stock}</p>
                <p>{item.seller}</p>
                {inStock && (
                  <button onClick={() => addToCart(item)}>Add To Cart</button>
                )}
              </ItemStyled>
            );
          })}
        </ItemContainerStyled>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
