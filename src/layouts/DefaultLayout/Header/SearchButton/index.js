import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import { debounce } from '../../../../utils';
import { DataService } from '../../../../services/data';
import ProductItem from '../../../../components/ProductItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

function SearchButton() {
  const [status, setStatus] = useState('idle');
  const [showBox, setShowBox] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [products, setProducts] = useState({ data: [] });
  const [searchInput, setSearchInput] = useState('');

  const inputRef = useRef();
  const boxRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    console.log('change');
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    setShowBox(false);
  }, [location]);

  useEffect(() => {
    if (searchInput.length > 0) {
      setStatus('pending');
      const data = new DataService();
      data.searchProducts(searchInput, { perpage: 6 }).then((data) => {
        if (data?.data?.length > 0) {
          setStatus('fulfilled');
          setProducts(data);
        } else setStatus('rejected');
      });
      return () => data.api.abort();
    } else {
      setStatus('idle');
    }
  }, [searchInput]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setShowInput(true);
    }, 300);

    return () => {
      clearTimeout(timeout);
      setShowInput(false);
      setStatus('idle');
    };
  }, [showBox]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowBox(true);
        }}
      >
        <AiOutlineSearch size="1.2rem" />
      </button>
      <CSSTransition
        in={showBox}
        classNames={{
          enter: 'opacity-0',
          enterActive: 'opacity-100',
          exit: 'opacity-0',
        }}
        timeout={300}
        nodeRef={boxRef}
        unmountOnExit
        mountOnEnter
      >
        <div
          ref={boxRef}
          className="fixed top-0 right-0 z-50 w-screen h-screen overflow-y-auto text-black transition-all duration-300 bg-white ease-timing-1"
        >
          <CSSTransition
            in={showInput}
            classNames={{
              enter: '-translate-y-20 opacity-0',
              enterActive: 'translate-y-0 opacity-100',
            }}
            mountOnEnter
            unmountOnExit
            timeout={0}
            nodeRef={inputRef}
          >
            <div
              className={"flex flex-col absolute left-0 items-center justify-center w-full max-w-full transition-all duration-500 "+(status === 'fulfilled' ? 'top-16': 'top-1/2 -translate-y-1/2')}
              ref={inputRef}
            >
              <div className="relative flex justify-center mt-2 w-[50rem] mb-20">
                <input
                  type="text"
                  placeholder="Tìm sản phẩm"
                  className="flex-1 px-3 py-1 mr-2 text-xl transition-all duration-300 border-b-2 outline-none focus:border-b-black"
                  onChange={debounce(handleSearchInputChange)}
                />
                <button
                  type="button"
                  className="px-3 py-1 text-xl transition-all duration-300"
                  onClick={() => navigate('/search?q=' + searchInput)}
                >
                  <BiSearch />
                </button>
                <CSSTransition
                  in={status === 'pending'}
                  classNames={{
                    enter: 'opacity-0',
                    exit: 'opacity-100',
                  }}
                  timeout={150}
                  unmountOnExit
                  mountOnEnter
                >
                  <div className="transition-opacity absolute z-40 h-56 text-4xl -translate-x-1/2 top-[calc(100%_+_2.5rem)] left-50 loading"></div>
                </CSSTransition>
              </div>
              <CSSTransition
                in={status === 'fulfilled'}
                classNames={{
                  enter: 'opacity-0 max-h-0',
                  enterActive: 'opacity-100 max-h-60vh duration-1000',
                  exit: 'opacity-100 max-h-60vh',
                  exitActive: '!opacity-0 !max-h-0 ease-timing-1 duration-500',
                }}
                timeout={{
                  enter: 1000,
                  exit: 500
                }}
                mountOnEnter
                unmountOnExit
              >
                <div className="w-full px-6 transition-all delay-75">
                  <ul className="flex flex-wrap w-full h-max">
                    {products.data.map((product) => (
                      <li
                        key={product.id}
                        className="w-1/2 px-4 pb-10 lg:w-1/6"
                      >
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
                          showModal={false}
                        />
                      </li>
                    ))}
                  </ul>
                  {/* <button
                    type="button"
                    className="block px-3 py-2 mx-auto text-gray-600 transition-colors bg-white border-2 border-gray-600 rounded hover:border-secondary hover:text-secondary"
                    onClick={() => navigate('/search?q=' + searchInput)}
                  >
                    Hiển thị toàn bộ kết quả
                  </button> */}
                </div>
              </CSSTransition>
            </div>
          </CSSTransition>
          <div className="absolute right-8 top-8">
            <button>
              <AiOutlineClose
                className="text-2xl text-gray-300 transition-colors duration-500 hover:text-gray-700"
                onClick={() => setShowBox(false)}
              />
            </button>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default SearchButton;
