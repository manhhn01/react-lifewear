import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import DropDown from '../../../components/DropDown';
import ProductItem from '../../../components/ProductItem';
import Modal from '../../../components/Modal';
import { togglePopup } from '../../../reducer/popupSlice';
import { DataService } from '../../../services/data';
import colors from './colors';
import Filter from './Filter';
import filterReducer from './filterReducer';

function CategoryDetail() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [category, setCategory] = useState({});
  const [sortOrder, setSortOrder] = useState({
    sortBy: 'created_at',
    sortOrder: 'desc',
    title: 'Mới nhất',
  });
  const [modalId, setModalId] = useState(null);
  const popup = useSelector((state) => state.popup);

  const [filters, updateFilters] = useReducer(filterReducer, {
    category: { selected: new Set(), show: true },
    colors: { selected: new Set(), show: true },
    sizes: { selected: new Set(), show: true },
    price: { selected: new Set(), show: true },
  });

  const handleChangePage = (newPage) => {
    searchParams.set('page', newPage);
    setSearchParams(searchParams, { state: { noScroll: true } });
  };

  useEffect(() => {
    setFirstLoad(true);
  }, [slug]);

  useEffect(() => {
    const page = () => searchParams.get('page');
    console.log('page', page());
    let timeout = setTimeout(() => {
      setLoading(true);
      if (!slug) {
        new DataService()
          .getProducts({
            perpage: 40,
            sortby: sortOrder.sortBy,
            order: sortOrder.order,
            colors: [...filters.colors.selected],
            sizes: [...filters.sizes.selected],
            category_id: [...filters.category.selected][0],
            price_min: null,
            price_max: null,
            page: page() || 1,
          })
          .then((data) => {
            setCategory({
              name: 'Tất cả sản phẩm',
              products: data,
            });
            setLoading(false);
            setFirstLoad(false);
          });
      } else
        new DataService()
          .getCategory(slug, {
            perpage: 12,
            sortby: sortOrder.sortBy,
            order: sortOrder.order,
            colors: [...filters.colors.selected],
            sizes: [...filters.sizes.selected],
            category_id: [...filters.category.selected][0],
            price_min: null,
            price_max: null,
            page: page() || 1,
          })
          .then((data) => {
            setCategory(data);
            setLoading(false);
            setFirstLoad(false);
          });
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    filters.category.selected,
    filters.colors.selected,
    filters.sizes.selected,
    searchParams,
    slug,
    sortOrder,
  ]);

  return firstLoad && loading ? (
    <div className="flex items-center justify-center h-screen -mt-24">
      <span className="text-4xl loading"></span>
    </div>
  ) : (
    <div className="mt-10">
      <ul className="container flex flex-wrap justify-center px-10 mx-auto mb-4 text-lg text-center">
        <li className="text-gray-700 last:text-secondary ">
          <Link to="/">Trang chủ</Link>
        </li>
        {category.parent && (
          <li className="text-gray-700 last:text-secondary before:content-['/'] before:px-2">
            <Link to={'/collections/' + category.parent.slug}>
              {category.parent.name}
            </Link>
          </li>
        )}
        <li className="text-2xl font-bold text-gray-700 uppercase basis-full last:text-secondary">
          <Link to={'/collections/' + category.slug}>{category.name}</Link>
        </li>
      </ul>
      <div className="container flex px-10 mx-auto">
        <aside className="hidden pt-16 lg:block lg:w-1/5">
          {/* Filter */}
          {/* Child Category Filter */}
          {category.children?.length > 0 && (
            <>
              <Filter
                title="Loại sản phẩm"
                name="category"
                filter={filters.category}
                onFilterUpdate={(action) => {
                  updateFilters(action);
                }}
                options={category.children.map((category) => ({
                  key: category.id,
                  title: category.name,
                }))}
                multiple={false}
              />
              <div className="my-4 border-b"></div>
            </>
          )}
          {/* /Child Category Filter */}
          {/* Color Filter */}
          <Filter
            title="Màu sắc"
            name="colors"
            filter={filters.colors}
            onFilterUpdate={(action) => {
              updateFilters(action);
            }}
            options={colors.map((color) => ({
              key: color.name,
              title: (
                <>
                  <span
                    className="inline-block w-5 h-5 mr-2 border-2 rounded-full"
                    style={{ backgroundColor: color.color }}
                  ></span>
                  {color.name}
                </>
              ),
            }))}
          />
          <div className="border-b-[1px] my-4"></div>
          {/* /Color Filter */}
          {/* Size Filter */}
          <Filter
            title="Kích cỡ"
            name="sizes"
            filter={filters.sizes}
            onFilterUpdate={(action) => {
              updateFilters(action);
            }}
            options={['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map(
              (color) => ({ key: color, title: color })
            )}
          />
          {/* /Size Filter */}
          {/* /Filter */}
        </aside>

        <div className="w-full lg:w-4/5 lg:pl-4">
          <div className="flex items-center justify-between h-16 text-gray-600">
            <div className="self-end mb-1">
              <>{category.products.products_count} sản phẩm</>
            </div>
            <div className="flex items-center">
              <div className="mr-2">Sắp xếp theo:</div>
              <div className="relative z-[11]">
                <button
                  className="w-40 px-4 py-2 text-center bg-gray-100 rounded"
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch(togglePopup('sortOption'));
                  }}
                >
                  <span className="">{sortOrder.title}</span>
                </button>
                <DropDown
                  show={popup === 'sortOption'}
                  position="l"
                  className="flex flex-col"
                >
                  <button
                    className="w-40 px-3 py-2 hover:bg-slate-100"
                    value="newest"
                    onClick={() => {
                      setSortOrder({
                        sortBy: 'created_at',
                        order: 'desc',
                        title: 'Mới nhất',
                      });
                    }}
                  >
                    Mới nhất
                  </button>
                  <button
                    className="w-40 px-3 py-2 hover:bg-slate-100"
                    value="priceAsc"
                    onClick={() => {
                      setSortOrder({
                        sortBy: 'price',
                        order: 'desc',
                        title: 'Giá giảm dần',
                      });
                    }}
                  >
                    Giá giảm dần
                  </button>
                  <button
                    className="w-40 px-3 py-2 hover:bg-slate-100"
                    value="priceDec"
                    onClick={() => {
                      setSortOrder({
                        sortBy: 'price',
                        order: 'asc',
                        title: 'Giá tăng dần',
                      });
                    }}
                  >
                    Giá tăng dần
                  </button>
                </DropDown>
              </div>
            </div>
          </div>
          <div className="relative w-full">
            <CSSTransition
              in={loading}
              classNames={{
                exit: 'opacity-0',
              }}
              mountOnEnter
              unmountOnExit
              timeout={300}
            >
              <div className="absolute left-0 right-0 z-20 flex justify-center w-full h-full pt-40 transition-opacity duration-300 bg-white">
                <span className="text-4xl loading"></span>
              </div>
            </CSSTransition>
            {category.products.products_count > 0 ? (
              <div className="flex flex-wrap -mx-4">
                {category?.products?.data?.map((product, index) => (
                  <div
                    className="w-1/2 px-4 pb-12 lg:w-1/4"
                    key={product.id || index}
                  >
                    <ProductItem
                      cover={product.cover}
                      id={product.id}
                      name={product.name}
                      onModalShow={(id) => {
                        setModalId(id);
                      }}
                      placeholder={!product.id}
                      price={product.price}
                      salePrice={product.sale_price}
                      slug={product.slug}
                      options={product.options}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <img
                  src="/images/empty-collection.png"
                  className="w-44"
                  alt="No Items"
                />
                <div className="text-gray-500">Không có sản phẩm nào</div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <ol className="flex justify-center space-x-1 text-xs font-medium">
            <li>
              <button
                type="button"
                onClick={() =>
                  handleChangePage(parseInt(searchParams.get('page') - 1))
                }
                disabled={searchParams.get('page') <= 1}
                className="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded disabled:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
            {Array(category.products.last_page)
              .fill()
              .map((_, index) => (
                <li>
                  <button
                    className={
                      'block w-8 h-8 leading-8 text-center border-2 rounded ' +
                      (index + 1 === parseInt(searchParams.get('page') || 1)
                        ? 'border-secondary text-secondary'
                        : 'border-gray-100')
                    }
                    onClick={() => handleChangePage(index + 1)}
                    key={index}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            <li>
              <button
                type="button"
                onClick={() =>
                  handleChangePage(parseInt(searchParams.get('page')) + 1)
                }
                className="inline-flex items-center justify-center w-8 h-8 border border-gray-200 rounded disabled:text-gray-200"
                disabled={
                  searchParams.get('page') || 1 >= category.products.last_page
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ol>
          {/* /Pagination */}
        </div>
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

export default CategoryDetail;
