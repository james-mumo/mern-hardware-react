import { useEffect, useReducer, useState } from 'react';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
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

const CategoryItem = ({ image, title, url }) => {
  return (
    <a href={url}>
      <div className="flex flex-col gap-2 items-center rounded-md overflow-hidden justify-evenly border p-1">
        <img src={image} alt={title} className="h-14 w-full rounded-md" />
        <h2>{title}</h2>
      </div>
    </a>
  );
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
        // console.log(data.data);
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
      <div className="products">
        <Carousel className="w-[95vw] rounded-md overflow-hidden">
          <Carousel.Item>
            <div
              style={{
                height: '80vh',
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
                <h1 className="text-blue-900 font-semibold text-xl">
                  Welcome to Prestige Links Limited
                </h1>
                <p className="text-2xl text-blue-600">
                  Building Strong Foundations, One Material at a Time
                </p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div
              style={{
                height: '80vh',
                width: '100vw',
                background: `url('https://res.cloudinary.com/djv535hkn/image/upload/v1688870386/prestigeLinks/rolls2_lbhwpl.jpg') no-repeat center center `,
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
                <h1 className="text-blue-900 font-semibold text-xl">
                  Welcome to Prestige Links Limited
                </h1>
                <p className="text-2xl text-blue-600">
                  Building Strong Foundations, One Material at a Time
                </p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div
              style={{
                height: '80vh',
                width: '100vw',
                background: `url('https://res.cloudinary.com/djv535hkn/image/upload/v1688870481/prestigeLinks/mach1_f2nt67.jpg') no-repeat center center `,
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
                <h1 className="text-blue-900 font-semibold text-xl">
                  Welcome to Prestige Links Limited
                </h1>
                <p className="text-2xl text-blue-600">
                  Building Strong Foundations, One Material at a Time
                </p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
        {/*  */}
        {/* all categories */}
        <div className="w-full flex flex-col">
          <span className="flex items-center">
            <hr className="border-t border-teal-100 mx-3 w-10" />
            <span className="text-[#7fffd4] text-[33px] font-semibold">
              Popular Categories
            </span>
            <hr className="border-t border-teal-100 mx-3 flex-grow" />
          </span>
        </div>

        <div className="categories flex flex-row justify-evenly w-full">
          <CategoryItem
            image="https://res.cloudinary.com/djv535hkn/image/upload/v1688871676/prestigeLinks/nails_ptysy7.jpg"
            title="Nails"
            url="/search?category=Nails"
          />
          <CategoryItem
            image="https://res.cloudinary.com/djv535hkn/image/upload/v1688871675/prestigeLinks/stelbars_j0fu3x.webp"
            title="Construction Steel"
            url="/search?category=Steel"
          />
          <CategoryItem
            image="https://res.cloudinary.com/djv535hkn/image/upload/v1688871675/prestigeLinks/wires_utrcgw.jpg"
            title="Binding Wires"
            url="/search?category=Binding Wire"
          />
          <CategoryItem
            image="https://res.cloudinary.com/djv535hkn/image/upload/v1688871675/prestigeLinks/stelbars_j0fu3x.webp"
            title="Construction Steel"
            url="/search?category=Steel"
          />
          <CategoryItem
            image="https://res.cloudinary.com/djv535hkn/image/upload/v1688871675/prestigeLinks/stelbars_j0fu3x.webp"
            title="Construction Steel"
            url="/search?category=Steel"
          />
        </div>

        {/*  */}
        <div className="featured w-full flex  flex-col">
          <div className="w-full flex flex-col mt-5">
            <span className="flex items-center py-2">
              <hr className="border-t border-teal-100 mx-3 w-10" />
              <span className="text-[#7fffd4] text-[20px] font-semibold">
                Featured Products
              </span>
              <hr className="border-t border-teal-100 mx-3 flex-grow" />
            </span>
          </div>

          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="w-full items-center flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-fit">
                {products &&
                  Array.isArray(products) &&
                  products.map((product) => (
                    <div
                      key={product.slug}
                      className="mb-3 hover:transform hover:translate-y-1 hover:transition duration-700"
                    >
                      <Product product={product} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

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
