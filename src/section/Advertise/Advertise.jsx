import React from "react";
import property1 from "../../assets/images/adproperty1.jpg";
import property2 from "../../assets/images/adproperty2.jpg";
// import property3 from "../../assets/images/adproperty3.jpg";
import property4 from "../../assets/images/adproperty4.jpg";
import property5 from "../../assets/images/adproperty5.jpg";

const properties = [
  {
    id: 1,
    image: property1,
    location: "Gulshan, Dhaka",
    price: "৳ 1.2 Crore - ৳ 1.5 Crore",
    verified: true,
  },
  {
    id: 2,
    image: property2,
    location: "Banani, Dhaka",
    price: "৳ 80 Lac - ৳ 1.1 Crore",
    verified: false,
  },
  //   {
  //     id: 3,
  //     image: property3,
  //     location: "Dhanmondi, Dhaka",
  //     price: "৳ 90 Lac - ৳ 1.3 Crore",
  //     verified: true,
  //   },
  {
    id: 4,
    image: property4,
    location: "Uttara, Dhaka",
    price: "৳ 60 Lac - ৳ 90 Lac",
    verified: true,
  },
  {
    id: 5,
    image: property5,
    location: "Airport, Dhaka",
    price: "৳ 70 Lac - ৳ 95 Lac",
    verified: true,
  },
];

const Advertise = () => {
  return (
    <section className="my-12 px-4 md:px-8 container mx-auto">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={property.image}
              alt="property"
              className="w-full h-32 lg:h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{property.location}</h3>
              <p className="text-gray-600">{property.price}</p>
              <p
                className={`text-sm font-medium ${
                  property.verified ? "text-green-600" : "text-red-500"
                }`}
              >
                {property.verified ? "Verified Property" : "Not Verified"}
              </p>
              <button className=" text-sm font-medium mt-2 border border-green-500 text-green-500 px-2 py-1 hover:bg-green-500 hover:text-white rounded bg-white ">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advertise;
