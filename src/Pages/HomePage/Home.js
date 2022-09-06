import React from 'react';
import Employee from './Employee';
import HomeBanner from './HomeBanner';
import OutstandingTask from './OutstandingTask';

const Home = () => {
    return (
        <>
        <HomeBanner/>
        <Employee/>
        <OutstandingTask/>
        
        </>
 
    );
};

export default Home;