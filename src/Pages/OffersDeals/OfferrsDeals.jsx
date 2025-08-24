import React from "react";

// Sample deals data
const dealsData = [
  {
    id: 1,
    title: "Luxury Villa in Dhaka",
    location: "Banani, Dhaka",
    originalPrice: 25000000,
    discountedPrice: 22000000,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "Gulshan, Dhaka",
    originalPrice: 15000000,
    discountedPrice: 13500000,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Cozy Family House",
    location: "Uttara, Dhaka",
    originalPrice: 12000000,
    discountedPrice: 11000000,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
];

const OffersDeals = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col">
      {/* Header Section */}
      <div className="text-center flex flex-col items-center gap-3">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
          Exclusive Property Deals
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
          Grab the best deals on properties in prime locations. Limited time offers!
        </p>
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Real Estate Property"
          className="rounded-xl shadow-xl w-full max-h-[350px] object-cover"
        />
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed mt-2">
          Finding your dream home doesn’t have to be overwhelming. Our curated
          property deals feature the best options in prime locations, offering
          both luxury and value. From modern apartments in the city to cozy
          family homes in peaceful neighborhoods, these exclusive offers are
          designed to suit every need. Take advantage of limited-time discounts
          and make your move today. Trust our experienced agents to guide you
          through every step of the buying process, ensuring a smooth and
          confident investment.
        </p>
      </div>

      {/* Section Title */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2 mt-12">
        Best Offers
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-center mb-6 max-w-2xl mx-auto leading-relaxed">
        Explore our handpicked property deals with amazing discounts. Whether
        you're looking for a luxury villa or a cozy family home, these offers are
        tailored to suit your needs. Act fast and secure your dream property today!
      </p>

      {/* Deals Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dealsData.map((deal) => (
          <div
            key={deal.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-52 md:h-60 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
                  {deal.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{deal.location}</p>
                <p className="mb-2 text-lg">
                  <span className="line-through text-red-500 mr-2">
                    {deal.originalPrice.toLocaleString()} BDT
                  </span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {deal.discountedPrice.toLocaleString()} BDT
                  </span>
                </p>
              </div>
              <button className="mt-2 w-full bg-green-500 dark:bg-green-600 text-white py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-500 font-semibold transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Don't Miss Out!
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Contact our agents today to grab these exclusive deals before they're gone.
        </p>
        <button className="mt-2 cursor-pointer bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
          Contact Agent
        </button>
      </div>
    </div>
  );
};

export default OffersDeals;
