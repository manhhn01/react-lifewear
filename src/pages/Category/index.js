import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataService } from '../../services/data';
import { random } from '../../utils';

function Category() {
  const [categories, setCategories] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const data = new DataService();
    data.getCategories().then((categories) => {
      setCategories(categories);
      setFirstLoad(false);
    });
    return () => data.api.abort();
  }, []);
  return firstLoad ? (
    <div className="flex items-center justify-center h-screen -mt-24">
      <span className="text-4xl loading"></span>
    </div>
  ) : (
    <div className="mt-10">
      <ul className="container flex flex-wrap justify-center px-10 mx-auto mb-4 text-lg text-center">
        <li className="text-gray-700 last:text-secondary ">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="text-2xl font-bold text-gray-700 uppercase basis-full last:text-secondary">
          <Link to={'/collections'}>Bộ sưu tập</Link>
        </li>
      </ul>
      <div className="container px-10 mx-auto">
        <div className="flex flex-wrap -mx-6">
          {categories
            .flatMap((parentCategory) => [...parentCategory.children])
            .map((category) => (
              <div className="p-6 lg:w-1/3">
                <Link
                  to={'/collections/' + category.slug}
                  className=" block pt-[80%] relative overflow-hidden group"
                  style={{
                    // todo replace this
                    backgroundImage: `url('${
                      category.cover ||
                      'https://api.lorem.space/image/fashion?w=600&h=600&hash=' +
                        random(1, 1000)
                    }')`,
                    backgroundSize: 'cover',
                  }}
                >
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                    <div className="absolute top-0 bottom-0 left-0 right-0 z-10 transition-opacity duration-700 bg-gray-900/50 md:opacity-0 group-hover:opacity-100"></div>
                    <h2 className="absolute z-20 text-3xl font-semibold tracking-wider text-center text-white uppercase transition-opacity duration-700 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      {category.name}
                    </h2>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
