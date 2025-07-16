import Marquee from "react-fast-marquee";
import apartment1 from "../../assets/images/apartment1.jpg";
import apartment2 from "../../assets/images/apartment2.jpg";
import apartment3 from "../../assets/images/apartment3.jpg";
import apartment4 from "../../assets/images/apartment4.jpg";
import apartment5 from "../../assets/images/apartment5.jpg";

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
    contact: "+00 123 496 7890",
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
    contact: "+00 123 445 7890",
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
    contact: "+00 123 657 7890",
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
    contact: "+00 123 456 7890",
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
    contact: "+00 123 496 7890",
  },
];

const ApartmentSale = () => {
  return (
    <section className="my-12 px-4 md:px-8 container mx-auto">
      <h2 className="text-2xl text-gray-700 md:text-4xl font-bold text-center mb-8">
        Apartments for Sale
      </h2>

      <Marquee pauseOnHover={true} gradient={false} speed={50}>
        {apartments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white rounded-lg shadow-md overflow-hidden mx-4 w-80"
          >
            <img
              src={apt.image}
              alt={apt.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold">{apt.title}</h3>
              <p className="text-gray-600 text-sm">{apt.description}</p>
              <p className="text-sm text-gray-500">{apt.location}</p>
              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <span>{apt.bedrooms} Beds</span>
                <span>{apt.bathrooms} Baths</span>
                <span>{apt.size}</span>
              </div>
              <p className="text-green-500 text-sm">{apt.contact}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ApartmentSale;
