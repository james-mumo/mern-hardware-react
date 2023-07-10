import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CompanyData from '../../companyInfo';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../../Store';
import { getError } from '../../utils';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';

function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <form
      className="w-fit  p-1 bg-[#2e2949 ] rounded-md border border-gray-900"
      onSubmit={submitHandler}
    >
      <div className="input-group">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
          className="bg-[#2e2949] outline-none rounded-md px-1 text-blue-50"
        />
        <button type="submit" id="button-search">
          <i className="fas fa-search p-1"></i>
        </button>
      </div>
    </form>
  );
}

const MainNavbar = () => {
  const [posView, setPosView] = useState(true);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;
  const [isUserInfo, setIsUserInfo] = useState('');

  useEffect(() => {
    const fetchUserInfo = () => {
      const storedUserInfo = localStorage.getItem('userInfo');
      const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
      setIsUserInfo(parsedUserInfo);
      console.log(parsedUserInfo?.isAdmin);
      console.log(parsedUserInfo?.data?.isAdmin);
    };

    fetchUserInfo();
  }, []);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/products/categories`
        );
        setCategories(data.data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="navbar top-0 flex flex-row justify-between px-10 py-1 border-bottom-1 mb-1">
      <div className="logo text-2xl flex flex-row gap-1 cursor-pointer h-7 justify-center align-middle font-mono font-bold hover:border-dashed">
        <NavLink to="/" className="flex flex-row">
          {/* <img src={logo} alt="logo" /> */}
          <span className="text-[#fffdfd]">{CompanyData.companyName}</span>
        </NavLink>
      </div>
      {posView ? (
        <>
          {/*  */}
          <div className="navButtons flex flex-row justify-center items-center gap-3">
            <Nav className="me-auto  w-100  justify-content-end items-center">
              {/* <SearchBox /> */}
              <SearchBox />
              <Link to="/" className="nav-link">
                Home&nbsp;
                <i className="fa fa-home" aria-hidden="true"></i>
              </Link>
              <Link to="/search" className="nav-link">
                Shop&nbsp;
                <i class="fa fa-shopping-bag" aria-hidden="true"></i>
              </Link>

              <Link to="/aboutus" className="nav-link">
                About Us&nbsp;
                <i class="fa fa-cogs" aria-hidden="true"></i>
              </Link>
              <Link to="/cart" className="nav-link">
                Cart&nbsp;
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {isUserInfo ? (
                <>
                  <Dropdown className="flex flex-col">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      <h2>{isUserInfo?.name}</h2>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="/profile" className="dropdown-item">
                          User Profile
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/orderhistory" className="dropdown-item">
                          Order History
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <Link
                          to="#signout"
                          className="dropdown-item"
                          onClick={signoutHandler}
                        >
                          Sign Out&nbsp;
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Link className="nav-link" to="/signin">
                  Sign In&nbsp;
                  <i className="fa fa-user" aria-hidden="true"></i>
                </Link>
              )}
              {/* </Nav> */}

              {isUserInfo?.isAdmin && (
                <Dropdown className="flex flex-col">
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    <h2>{isUserInfo?.name}</h2>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="/admin/dashboard" className="dropdown-item">
                        Dashboard
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/admin/products" className="dropdown-item">
                        Products
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/admin/orders" className="dropdown-item">
                        Orders
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/admin/users" className="dropdown-item">
                        Users
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </div>
        </>
      ) : (
        <>
          <div className="navButtons headerNavigationButton lightPurple flex flex-row rounded-md">
            <a
              href="/"
              className="flex flex-col justify-center px-2 rounded-md"
            >
              <div className="headerNavigationButton">
                <span className="navItemSpan">Website</span>
              </div>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default MainNavbar;
