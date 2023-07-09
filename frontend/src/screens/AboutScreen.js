import React from 'react';

const AboutScreen = () => {
  return (
    <div className="container">
      <div className="flex w-full flex-row">
        <h1 className="text-5xl font-semibold">About Us</h1>
      </div>

      <div className="flex md:flex-row flex-col gap-3 h-full">
        <img
          src="https://res.cloudinary.com/djv535hkn/image/upload/v1688863757/prestigeLinks/officeImg1_r34sdv.jpg"
          alt="About Us"
          className="img-fluid h-[80vh] rounded-md"
        />

        <div className="flex-1 flex flex-row border p-3">
          <div className="about-text">
            <h2>About Our Store</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              gravida, est sed consequat maximus, neque lacus aliquam ligula, eu
              fermentum ex lorem vel justo. Aliquam erat volutpat.
            </p>
            <p>
              Sed porttitor nisi ac ante dapibus, at interdum nulla commodo.
              Quisque at risus pulvinar, efficitur purus eu, euismod odio.
              Integer eget orci fermentum, consequat nibh a, eleifend tortor.
              Mauris mattis nulla vel mi aliquet dignissim. Sed vitae metus
              tristique, malesuada massa in, dapibus dolor.
            </p>
          </div>
          <div className="aboutCategories pl-4 pr-10">
            <h2>Categories</h2>
            <h3>Construction</h3>
            <h3>Construction</h3>
            <h3>Construction</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
