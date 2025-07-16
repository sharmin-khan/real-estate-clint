import React from 'react';
import Banner from '../../component/Banner/Banner';
import Advertise from '../../section/Advertise/Advertise';
import Newsletter from '../../section/Newstetter/Newsletter';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Advertise/>
            <Newsletter/>
        </div>
    );
};

export default Home;