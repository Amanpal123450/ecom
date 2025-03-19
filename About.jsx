import React from "react";

const About = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">About Us</h2>

        {/* Company Overview */}
        <div className="mb-12 text-center">
          <p className="text-lg">
            Welcome to <span className="font-semibold">E-Shop</span>, your number one destination for high-quality products.
            We re dedicated to giving you the best shopping experience, with a focus on **affordability, quality, and customer service**.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Statement */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h3>
            <p>
              Our mission is to **bring you the best products at unbeatable prices**, while ensuring excellent customer satisfaction.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Why Choose Us?</h3>
            <ul className="list-disc list-inside">
              <li>🌍 **Wide Selection of Products**</li>
              <li>🚚 **Fast & Reliable Shipping**</li>
              <li>💳 **Secure Payment Methods**</li>
              <li>🎯 **Customer Satisfaction Guarantee**</li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-blue-600 mb-2">Get in Touch</h3>
          <p className="mb-2">📍 123 E-Shop Lane, New York, USA</p>
          <p className="mb-2">📞 +1 234 567 890</p>
          <p>✉️ support@eshop.com</p>
        </div>
      </div>
    </section>
  );
};

export default About;
