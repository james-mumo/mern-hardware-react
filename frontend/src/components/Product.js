import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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

  return (
    <div className="card p-1 flex flex-col w-[250px]">
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
        {product.countInStock === 0 ? (
          <button className="btn btn-light" disabled>
            Out of stock
          </button>
        ) : (
          <button className="btn" onClick={() => addToCartHandler(product)}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
export default Product;
