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
            <h2 className="py-1 font-semibold text-2xl">About Our Store</h2>
            <p>
              At Prestige Hardware Store, we pride ourselves on being a leading
              provider of high-quality hardware and construction materials. With
              over 6 years of experience in the industry, we have established
              ourselves as a reliable source for all your hardware needs. <br />
              <br />
              Our extensive inventory includes a wide range of products,
              including tools, fasteners, electrical supplies, plumbing
              fixtures, paint, and much more. Whether you're a professional
              contractor or a DIY enthusiast, we have everything you need to
              tackle your projects with confidence. We prioritize customer
              satisfaction and strive to provide exceptional service.
              <br />
              <br />
              Visit our store today and experience the Prestige Hardware Store
              difference. We look forward to serving you and being your trusted
              partner for all your hardware and construction material needs.
            </p>
            <p>Check our social Links to get our location and contacts</p>
            <br />
            <p>
              <strong>Call Us On : </strong> +25412341234
            </p>
            <p>
              <strong>Email Us On : </strong> info.prestige.com
            </p>
          </div>
          <div className="aboutCategories pl-10 pr-12 flex flex-col gap-1 opacity-80">
            <h2 className="py-1 font-semibold text-2xl opacity-100">
              Categories
            </h2>
            <h3>Binding wires </h3>
            <h3>Cement </h3>
            <h3>Safety and Protective Gear</h3>
            <h3>Construction Materials</h3>
            <h3>Painting Supplies</h3>
            <h3>Plumbing Supplies</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
