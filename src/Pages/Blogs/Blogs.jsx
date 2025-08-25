import React, { useState } from "react";

const blogsData = [
  {
    id: 1,
    title: "How to Choose the Perfect Property",
    author: "Admin",
    date: "2025-08-25",
    excerpt: "Choosing the right property can be overwhelming. Here are some tips...",
    fullText: "Choosing the right property can be overwhelming. Here are some tips to make the process easier: 1. Location matters 2. Budget planning 3. Check amenities 4. Legal verification 5. Future resale value. Follow these tips to choose the perfect property!"
  },
  {
    id: 2,
    title: "Top 5 Real Estate Investment Strategies",
    author: "Admin",
    date: "2025-08-20",
    excerpt: "Investing in real estate can be profitable if done right...",
    fullText: "Investing in real estate can be profitable if done right. Here are five strategies: 1. Buy and hold 2. Flipping 3. Rental properties 4. REITs 5. Commercial real estate. These strategies can help you maximize returns."
  },
  {
    id: 3,
    title: "Understanding Property Valuation",
    author: "Admin",
    date: "2025-08-18",
    excerpt: "Knowing how properties are valued is key for both buyers and sellers...",
    fullText: "Knowing how properties are valued is key for both buyers and sellers. Important factors include location, market trends, property condition, and comparable sales. Learn these to make smart decisions."
  }
];

const Blogs = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleReadMore = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto my-12 flex flex-col gap-12">
      {/* Intro Section */}
      <div className="text-center flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to PropEase Insights
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
          Stay updated with the latest trends, tips, and guides in real estate. Our blogs help you make informed decisions and grow your investments.
        </p>
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1170&q=80"
          alt="Real Estate Property"
          className="rounded-lg shadow-lg w-full max-h-[500px] object-cover mt-4"
        />
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogsData.map(blog => (
          <div
            key={blog.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                By {blog.author} | {blog.date}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {expandedId === blog.id ? blog.fullText : blog.excerpt}
              </p>
            </div>
            <div className="mt-4 text-right">
              <button
                className="text-green-600 dark:text-green-400 font-semibold hover:underline"
                onClick={() => toggleReadMore(blog.id)}
              >
                {expandedId === blog.id ? "Show Less ↑" : "Read More →"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Conclusion Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Stay Ahead in Real Estate
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Knowledge is key. Keep following our blogs to get the latest insights, expert advice, and market trends. Whether you’re buying, selling, or investing, PropEase has got you covered.
        </p>
      </div>
    </div>
  );
};

export default Blogs;
