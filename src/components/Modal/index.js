import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { DataService } from '../../services/data';
import FadeImage from '../FadeImage';
import VariantPick from '../VariantPick';

function Modal({
  id,
  onModalClose,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (id) {
      new DataService()
        .getProduct(id)
        .then((data) => {
          setProduct(data);
          setPreviewImage(data.options.colors[0].cover);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });

      return () => {
        //todo
      };
    }
  }, [id, onModalClose]);
  return (
    // TODO global state modal open => https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    <div
      className="fixed top-0 left-0 z-40 flex items-center justify-center w-screen h-screen transition-opacity duration-300 rounded-sm cursor-auto bg-black/40 p-14"
      onClick={(event) => {
        onModalClose();
      }}
    >
      {loading && <span className="text-4xl text-white loading"></span>}
      <CSSTransition
        classNames={{
          enter: 'opacity-0',
          enterDone: 'opacity-100',
        }}
        in={!loading}
        timeout={0}
        mountOnEnter
        unmountOnExit
      >
        <div
          className="flex max-w-full max-h-full p-8 bg-white w-[68rem] h-[36rem] overflow-auto transition-opacity duration-300 "
          onClick={(event) => event.stopPropagation()}
        >
          <div className="sticky top-0 bottom-0 h-full lg:basis-2/5 bg-slate-50">
            <FadeImage src={previewImage} alt={product.name} />
          </div>
          <VariantPick
            className="h-auto ml-8 self-baseline lg:basis-3/5"
            product={product}
            onPreviewImageChange={(image) => {
              setPreviewImage(image);
            }}
          />
        </div>
      </CSSTransition>
    </div>
  );
}

export default Modal;
