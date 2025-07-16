const Newsletter = () => {
  return (
    <section className="bg-green-50 py-10 px-4 md:px-8 text-center rounded-lg lg:max-w-3xl md:max-w-2xl mx-auto my-12">
      <h2 className="text-xl md:text-3xl font-bold mb-4 text-green-700">
        Subscribe to Our Newsletter
      </h2>
      <p className="mb-6 text-green-900">
        Stay updated with the latest properties and exclusive offers.
      </p>
      <form className="flex flex-col sm:flex-row justify-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
