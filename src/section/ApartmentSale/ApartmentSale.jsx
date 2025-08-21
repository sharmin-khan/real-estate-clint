import Marquee from "react-fast-marquee";
import apartment1 from "../../assets/images/apartment1.jpg";
import apartment2 from "../../assets/images/apartment2.jpg";
import apartment3 from "../../assets/images/apartment3.jpg";
import apartment4 from "../../assets/images/apartment4.jpg";
import apartment5 from "../../assets/images/apartment5.jpg";
import { FaBed, FaBath, FaVectorSquare } from "react-icons/fa";

const apartments = [
  {
    id: 1,
    image: apartment1,
    title: "Modern Family Apartment",
    description: "A beautiful 3-bedroom apartment with a spacious living room.",
    location: "Gulshan, Dhaka",
    bedrooms: 3,
    bathrooms: 2,
    size: "1200 sq ft",
    contact: "+0012396890",
  },
  {
    id: 2,
    image: apartment2,
    title: "Luxury Condo",
    description: "Elegant condo with city views and premium features.",
    location: "Banani, Dhaka",
    bedrooms: 2,
    bathrooms: 2,
    size: "950 sq ft",
    contact: "+0023447890",
  },
  {
    id: 3,
    image: apartment3,
    title: "Cozy Apartment",
    description: "Affordable and comfortable living in a prime location.",
    location: "Dhanmondi, Dhaka",
    bedrooms: 2,
    bathrooms: 1,
    size: "800 sq ft",
    contact: "+0023577890",
  },
  {
    id: 4,
    image: apartment4,
    title: "Cozy Apartment",
    description: "Elegant condo with city views and premium features.",
    location: "Airport, Dhaka",
    bedrooms: 3,
    bathrooms: 2,
    size: "900 sq ft",
    contact: "+001234567890",
  },
  {
    id: 5,
    image: apartment5,
    title: "Luxury Condo",
    description: "Elegant condo with city views and premium features.",
    location: "Badda, Dhaka",
    bedrooms: 2,
    bathrooms: 2,
    size: "900 sq ft",
    contact: "+001234967890",
  },
];
const badges = ["New", "Latest", "For Rent", "Hot Deal", "Luxury"];

const ApartmentSale = () => {
  return (
    <section className="my-12">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-3">
        Apartments for Sale
      </h2>
      <p className="text-center mb-10">
        Explore our handpicked modern and luxury apartments available in Dhaka.
      </p>

      <Marquee pauseOnHover={true} gradient={false} speed={50}>
        {apartments.map((apt, index) => (
          <div
            key={apt.id}
            className="bg-white  dark:bg-gray-900/70 rounded-lg shadow-md overflow-hidden mx-4 w-80 relative"
          >
            {/* Badge */}
            <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {badges[index % badges.length]}
            </span>

            <img
              src={apt.image}
              alt={apt.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold">{apt.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{apt.description}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-bold">{apt.location}</p>

              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
                <span className="flex items-center gap-1">
                  <FaBed /> {apt.bedrooms} Beds
                </span>
                <span className="flex items-center gap-1">
                  <FaBath /> {apt.bathrooms} Baths
                </span>
                <span className="flex items-center gap-1">
                  <FaVectorSquare /> {apt.size}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm"><span className="text-green-500 font-bold">Contact:</span> {apt.contact}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ApartmentSale;
