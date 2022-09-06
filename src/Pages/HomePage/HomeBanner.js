import React from 'react';
import mobileTower1 from '../../images/Mobile Tower2.jpg'

const HomeBanner = () => {
    return (
        <div class="carousel w-full mb-2 mt-1">
  <div id="slide4" class="carousel-item relative w-full">
    <img src={mobileTower1} class="w-full h-96" alt='mobile Tower' />
    {/* <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" class="btn btn-circle">❮</a> 
      <a href="#slide1" class="btn btn-circle">❯</a>
    </div> */}
  </div>
</div>
    );
};

export default HomeBanner;