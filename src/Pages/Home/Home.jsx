import React from 'react';
import Banner from '../../component/Banner/Banner';
import Advertise from '../../section/Advertise/Advertise';
import Newsletter from '../../section/Newstetter/Newsletter';
import ApartmentSale from '../../section/ApartmentSale/ApartmentSale';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Advertise/>
            <ApartmentSale/>
            <Newsletter/>
        </div>
    );
};

export default Home;