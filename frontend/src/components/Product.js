import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const existItem = cartItems.find((x) => x._id === product._id);
  const [quantity, setQuantity] = useState(existItem ? existItem.quantity : 1);

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/products/${item._id}`
    );
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const addToCartHandler = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/products/${product._id}`
    );
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    if (existItem) {
      // If item is already in the cart, update the quantity
      ctxDispatch({
        type: 'CART_UPDATE_QUANTITY',
        payload: { _id: product._id, quantity },
      });
    } else {
      // If item is not in the cart, add it
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity },
      });
    }
  };

  const isInCart = existItem !== undefined;

  return (
    <div className="card p-1 flex flex-col w-[250px] hover:bg-slate-200 hover:transition duration-700">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top h-[265px] w-[250px]"
          alt={product.name}
        />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product.slug}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p>${product.price}</p>
        {isInCart ? (
          <div className="flex items-center h-6 mt-2 justify-center w-full ">
            <button
              className="btn bg-red-600 hover:bg-red-700 text-white "
              onClick={() => addToCartHandler(product)}
            >
              Remove from cart
            </button>
            {/* <div className="flex ml-2"> justify-center
              <Button
                onClick={() => updateCartHandler(product, product.quantity - 1)}
                variant="light"
                disabled={product.quantity === 1}
              >
                <i className="fas fa-minus-circle"></i>
              </Button>{' '}
              <input
                type="number"
                value={quantity}
                className="w-12 text-center border border-gray-300 mx-2"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <Button
                onClick={() => updateCartHandler(product, product.quantity + 1)}
                variant="light"
              >
                <i className="fas fa-plus-circle"></i>
              </Button>{' '}
            </div> */}
          </div>
        ) : (
          <div className="flex items-center h-6 mt-2 justify-center w-full ">
            <button
              className="btn bg-blue-600 hover:bg-blue-500 text-white "
              onClick={() => addToCartHandler(product)}
            >
              Add to cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
