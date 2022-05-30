import React from 'react';
import { Link } from 'react-router-dom';

function Category({ image, to,  title }) {
  return (
    <Link to={to} className="relative block w-full h-full overflow-hidden group">
      <img
        className="object-contain w-full transition-transform duration-1000 group-hover:scale-110"
        src={image.src}
        alt={image.alt}
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 transition-opacity duration-700 bg-gray-900/50 md:opacity-0 group-hover:opacity-100"></div>
      <h3 className="absolute z-20 text-4xl tracking-wider text-white uppercase transition-opacity duration-700 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:opacity-0 group-hover:opacity-100">
        {title}
      </h3>
    </Link>
  );
}

export default Category;
