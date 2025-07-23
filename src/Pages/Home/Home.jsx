import React from 'react';
import Banner from '../../component/Banner/Banner';
import Advertise from '../../section/Advertise/Advertise';
import Newsletter from '../../section/Newstetter/Newsletter';
import ApartmentSale from '../../section/ApartmentSale/ApartmentSale';
import LatestReviews from '../../section/LatestViews/LatestViews';


const Home = () => {
    return (
        <div>
            <Banner/>
            <Advertise/>
            <LatestReviews/>
            <ApartmentSale/>
            <Newsletter/>
        </div>
    );
};

export default Home;