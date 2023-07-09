import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import 'react-toastify/dist/ReactToastify.css';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { getError } from '../utils';
import { toast, ToastContainer } from 'react-toastify';
// import data from '../data';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [categories, setCategories] = useState([]);

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/products/categories`
        );
        setCategories(data.data);
        console.log(data.data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/products`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Prestige Links</title>
      </Helmet>
      {/* landing page */}
      {/*  */}
      <div className="products border">
        <div
          style={{
            height: '90vh',
            width: '100vw',
            background: `url('https://res.cloudinary.com/djv535hkn/image/upload/v1688858297/prestigeLinks/steelItems_no5ehe.jpg') no-repeat center center `,
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '20px',
              borderRadius: '5px',
            }}
          >
            <h1>Welcome to Prestige Links Limited</h1>
            <p className="text-2xl">
              Building Strong Foundations, One Material at a Time
            </p>
          </div>
        </div>
        {/*  */}
        {/* all categories */}
        <div className="w-full border flex flex-col">
          <h1 className="w-full ml-10 text-3xl py-2">Popular Categories</h1>
        </div>

        {categories &&
          Array.isArray(categories) &&
          categories.map((category) => (
            <span
              key={category}
              className="border border-teal-300 flex-col flex items-center p-4"
            >
              {/* <Nav.Item>
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item> */}
              <img
                src={`url/to/${category}-image.jpg`}
                alt={category}
                className="mt-2"
              />
              <p className="mt-2">{category}</p>
            </span>
          ))}
        {/*  */}
        <div className="w-full border flex flex-col">
          <h1 className="w-full ml-10 text-3xl py-2">Featured Products</h1>
        </div>

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products &&
              Array.isArray(products) &&
              products?.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
          </Row>
        )}

        {/*  */}

        <div className="flex flex-row">
          <div className="flex flex-col">
            <p>See More Items</p>
            <h4>Everything In One Place</h4>
            <button>Recently Added Items</button>
          </div>
          <div className="carouself">item and image</div>
        </div>
      </div>
    </div>
  );
}
export default HomeScreen;
