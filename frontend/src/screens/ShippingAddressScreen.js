import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import { citiesData, nationsData } from '../data';

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    fullBox,
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [firstName, setFirstName] = useState(shippingAddress.firstName || '');
  const [lastName, setLastName] = useState(shippingAddress.lastName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || '');
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        locality: city,
        administrative_area: city,
        address1: postalCode,
        country: selectedCountry,
        countryShort: selectedCountry,
        phone_number: phone,
        location: shippingAddress.location,
        expiration_year: selectedYear,
        expiration_month: selectedMonth,
        security_code: secCode,
        number: cardNumber,
        email: 'email',
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        address: address,
        locality: city,
        administrative_area: city,
        address1: postalCode,
        country: selectedCountry,
        countryShort: selectedCountry,
        phone_number: phone,
        location: shippingAddress.location,
        expiration_year: selectedYear,
        expiration_month: selectedMonth,
        security_code: secCode,
        number: cardNumber,
        email: 'email',
      })
    );
    // console.log({
    //   firstName: firstName,
    //   lastName: lastName,
    //   address: address,
    //   locality: city,
    //   administrative_area: city,
    //   address1: postalCode,
    //   country: selectedCountry,
    //   countryShort: selectedCountry,
    //   phone_number: phone,
    //   location: shippingAddress.location,
    //   expiration_year: selectedYear,
    //   expiration_month: selectedMonth,
    //   security_code: secCode,
    //   number: cardNumber,
    //   email: 'email',
    // });
    navigate('/payment');
  };
  const [isChecked, setIsChecked] = useState(false);
  const [secCode, setSecCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    ctxDispatch({ type: 'SET_FULLBOX_OFF' });
  }, [ctxDispatch, fullBox]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleCityInputChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    // Filter suggestions based on user input
    const filteredSuggestions = citiesData
      .filter((cityData) =>
        cityData.city.toLowerCase().startsWith(inputValue.toLowerCase())
      )
      .map((cityData) => `${cityData.city}, ${cityData.state}`);

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setCity(suggestion);
    console.log(suggestion);
    setSuggestions([]);
  };

  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const results = nationsData.filter((nation) => {
      const nationName = nation.name.toLowerCase();
      // return nationName.includes(searchTerm.toLowerCase());
      return nationName.toLowerCase().startsWith(searchTerm.toLowerCase());
    });

    setSearchResults(results);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country.name);
    setSearchTerm(country);
    // console.log(country);
    setSearchResults([]);
  };

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container border rounded-md mt-1">
        <h1 className="my-3 font-semibold text-2xl">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <div className="flex flex-row gap-2">
            <Form.Group className="mb-3 w-full" controlId="firstName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 w-full" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <div className="flex flex-row gap-2">
            <Form.Group className="mb-3 w-full" controlId="city">
              <span className="font-semibold px-0">Country</span>
              <div className="text-white">
                <div>
                  <div className="flex border">
                    <input
                      className="text-black w-[90%] flex-1 py-1"
                      type="text"
                      value={searchTerm.name}
                      onChange={handleSearch}
                      placeholder="Search for a country..."
                    />
                    {searchTerm?.shortForm && (
                      <p className="text-gray-900 bg-slate-500 px-1 border">
                        {searchTerm?.shortForm}
                      </p>
                    )}
                  </div>
                  <ul className="max-h-[120px] overflow-scroll text-gray-300 p-1">
                    {searchResults.map((nation) => (
                      <li
                        key={nation.shortForm}
                        onClick={() => handleSelectCountry(nation)}
                      >
                        {nation.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 w-full" controlId="city">
              <span className="font-semibold px-0">City</span>
              <div className="text-gray-900">
                <input
                  className="text-black w-full p-1"
                  type="text"
                  placeholder="Enter city"
                  value={input}
                  onChange={handleCityInputChange}
                />
                <ul className="max-h-[120px] overflow-scroll text-gray-500">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </Form.Group>
          </div>
          <div className="flex gap-2">
            <Form.Group className="mb-3 w-full" controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 w-full" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          {/* card  */}
          <div className="card-body py-2">
            <label className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="form-check-label font-semibold">
                Debit/Credit User?
              </span>
            </label>
          </div>
          {/* card */}
          {isChecked && (
            <>
              <div className="flex gap-2 mb-2">
                <Form.Group className="mb-3 w-full" controlId="cardNumber">
                  <Form.Label>Card Number </Form.Label>
                  <Form.Control
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 w-full" controlId="secCode">
                  <Form.Label>Security Code</Form.Label>
                  <Form.Control
                    value={secCode}
                    onChange={(e) => setSecCode(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div className="flex gap-2 mb-2">
                <Form.Group
                  className="mb-3 w-full flex flex-col"
                  controlId="cardNumber"
                >
                  <Form.Label>Expiration Year </Form.Label>
                  {/* <Form.Control
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    required
                  /> */}
                  <select
                    id="year"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="h-10 rounded-md text-black"
                  >
                    <option value="">-- Select Year --</option>
                    <option value="2023">2023</option>
                    <option value="2021">2024</option>
                    <option value="2022">2025</option>
                    <option value="2022">2026</option>
                    <option value="2022">2027</option>
                    <option value="2022">2028</option>
                    <option value="2022">2029</option>
                  </select>
                </Form.Group>
                <Form.Group
                  className="mb-3 w-full flex flex-col"
                  controlId="secCode"
                >
                  <Form.Label>Expiry Month</Form.Label>
                  <select
                    id="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="h-10 rounded-md text-black"
                  >
                    <option value="" className="text-black">
                      -- Select Month --
                    </option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="Octomber">Octomber</option>
                    <option value="November">November</option>
                    <option value="Decemeber">Decemeber</option>
                  </select>
                </Form.Group>
              </div>
            </>
          )}
          {/* <div className="mb-3">
            <Button
              id="chooseOnMap"
              type="button"
              variant="light"
              onClick={() => navigate('/map')}
            >
              Choose Location On Map
            </Button>
            {shippingAddress.location && shippingAddress.location.lat ? (
              <div>
                LAT: {shippingAddress.location.lat}
                LNG:{shippingAddress.location.lng}
              </div>
            ) : (
              <div>No location</div>
            )}
          </div> */}

          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
