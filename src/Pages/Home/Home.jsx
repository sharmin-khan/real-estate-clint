import React, { useEffect } from "react";
import Banner from "../../component/Banner/Banner";
import Advertise from "../../section/Advertise/Advertise";
import Newsletter from "../../section/Newstetter/Newsletter";
import ApartmentSale from "../../section/ApartmentSale/ApartmentSale";
import LatestReviews from "../../section/LatestViews/LatestViews";
import FindProperty from "../../section/FindProperty/FindProperty";
import FAQ from "../../section/FAQ/FAQ";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Banner />
      <Advertise />
      <FindProperty/>
      <FAQ/>
      <LatestReviews />
      <ApartmentSale />
      <Newsletter />
    </div>
  );
};

export default Home;
