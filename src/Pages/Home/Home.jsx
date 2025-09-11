import React, { useEffect } from "react";
import Banner from "../../component/Banner/Banner";
import Advertise from "../../section/Advertise/Advertise";
import Newsletter from "../../section/Newstetter/Newsletter";
import ApartmentSale from "../../section/ApartmentSale/ApartmentSale";
import LatestReviews from "../../section/LatestViews/LatestViews";
import FindProperty from "../../section/FindProperty/FindProperty";
import FAQ from "../../section/FAQ/FAQ";
import { Helmet } from "react-helmet";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>Home - PropEase</title>
        <meta
          name="description"
          content="Explore the latest verified properties on PropEase."
        />
      </Helmet>
      <div>
        <div className="mt-6">
          <Banner />
        </div>
        <Advertise />
        <FindProperty />
        <ApartmentSale />
        <FAQ />
        <LatestReviews />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;
