import React from 'react';
import Category from './Category';

function HomeCategories() {
  return (
    <div className="flex flex-wrap">
      <div className="h-56 basis-full md:basis-1/3">
        <Category
          image={{
            src: '//cdn.shopify.com/s/files/1/2554/9230/files/shop-category-01.jpg',
            alt: 'Nữ',
          }}
          title="NỮ"
          to="/collections/nu"
        />
      </div>
      <div className="h-56 basis-full md:basis-1/3">
        <Category
          image={{
            src: '//cdn.shopify.com/s/files/1/2554/9230/files/shop-category-04.jpg',
            alt: 'Nam',
          }}
          title="NAM"
          to="/collections/nam"
        />
      </div>
      <div className="h-56 basis-full md:basis-1/3">
        <Category
          image={{
            src: '//i.imgur.com/ZOUYkZd.png',
            alt: 'Trẻ em',
          }}
          title="Trẻ em"
          to="/collections/tre-em"
        />
      </div>
    </div>
  );
}

export default HomeCategories;
