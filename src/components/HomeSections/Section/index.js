import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addWishlist, removeWishlist } from '../../../reducer/wishlistSlice';
import ProductItem from '../../ProductItem';
import Modal from '../../Modal';

function Section({ url, urlShowMore = null, title, description = '' }) {
  const [products, setProducts] = useState({
    data: Array(8).fill({ placeholder: true }),
  });
  const [modalId, setModalId] = useState(null);

  useEffect(() => {
    //todo data service
    axios
      .get(new URL('api/' + url, process.env.REACT_APP_API_ENDPOINT).href, {
        params: {
          perpage: 10,
        },
      })
      .then(({ data }) => {
        //todo
        if (data.data) setProducts(data);
        else {
          setProducts(data.products);
        }
      });
  }, [url]);

  return (
    <div className="container px-10 mx-auto mt-12">
      <h2 className="text-2xl font-semibold text-center uppercase text-secondary">
        {title}
      </h2>
      {description && (
        <p className="text-center text-gray-400">{description}</p>
      )}
      <div className="flex flex-wrap pt-6">
        {products.data?.map((product, index) => (
          <div className="w-1/2 px-4 pb-10 lg:w-1/5" key={product.id || index}>
            <ProductItem
              id={product.id}
              slug={product.slug}
              price={product.price}
              salePrice={product.sale_price}
              name={product.name}
              rating={product.rating_avg}
              cover={product.cover}
              placeholder={product.placeholder}
              options={product.options}
              onModalShow={(id) => {
                setModalId(id);
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Link
          className="px-16 py-2 text-white uppercase rounded-sm bg-secondary"
          to={urlShowMore ? urlShowMore : '/collections/' + url}
        >
          Xem thêm
        </Link>
      </div>

      {modalId && (
        <Modal
          id={modalId}
          onModalClose={() => {
            setModalId(null);
          }}
        />
      )}
    </div>
  );
}

export default Section;
