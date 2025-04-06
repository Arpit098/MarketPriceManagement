import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className=" text-black p-6">
        <h1 className="text-3xl font-bold">About Us</h1>
      </header>

      <main className="flex-grow p-8">
        <section className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-700 mb-4">
            We are a dedicated team providing market updates and insights to
            help you stay informed. Our mission is to deliver timely and
            accurate information to our clients.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Integrity</li>
            <li>Innovation</li>
            <li>Customer Satisfaction</li>
          </ul>
        </section>
      </main>

      <footer className="bg-blue-600 text-white text-center p-4">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
