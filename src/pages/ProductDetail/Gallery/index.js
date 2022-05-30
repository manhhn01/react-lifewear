import React, { useEffect, useState } from 'react';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import FadeImage from '../../../components/FadeImage';
import LazyImage from '../../../components/LazyImage';

function Gallery({ images, className, previewImage: customPreviewImage }) {
  const [previewImage, setPreviewImage] = useState({ index: 0, ...images[0] });
  const [page, setPage] = useState(0);
  const hasNextPage = () => page < images.length - 4;
  const hasPrevPage = () => page > 0;

  useEffect(() => {
    if (customPreviewImage) {
      setPreviewImage({ image: customPreviewImage });
    }
  }, [customPreviewImage]);

  useEffect(() => {
    let maxIndex = page + 3;
    if (previewImage.index != null)
      if (previewImage.index > maxIndex) {
        setPreviewImage({ index: maxIndex, ...images[maxIndex] });
      } else if (previewImage.index < page) {
        setPreviewImage({ index: page, ...images[page] });
      }
  }, [images, page, previewImage]);

  return (
    <div className={'flex ' + className}>
      <div className="hidden lg:block lg:mr-8 ">
        <div
          className={
            'h-8 flex items-center justify-center mb-2 bg-gray-50 ' +
            (hasPrevPage()
              ? 'text-secondary cursor-pointer'
              : 'text-secondary/40')
          }
          onClick={() =>
            setPage((prevPage) => (hasPrevPage() ? prevPage - 1 : prevPage))
          }
        >
          <BsChevronCompactUp size="2rem" />
        </div>
        <div className="lg:w-28 lg:h-[33.5rem] overflow-hidden">
          <div
            className="transition-all"
            style={{ marginTop: page * (32 + 2) * -0.25 + 'rem' }}
          >
            {images.map((image, index) => (
              <div
                className="relative w-full h-32 mb-2 cursor-pointer select-none last:mb-0"
                onMouseMove={() => {
                  setPreviewImage({ index, ...image });
                }}
                key={image.id}
              >
                <LazyImage
                  className={
                    'block object-cover w-full border-2 h-full p-0 m-0 ' +
                    (image.id === previewImage.id
                      ? 'border-secondary'
                      : 'border-white')
                  }
                  src={image.image}
                  alt={'test'}
                  backgroundImage
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className={
            'h-8 flex items-center justify-center mt-2 bg-gray-50 ' +
            (hasNextPage()
              ? 'text-secondary cursor-pointer'
              : 'text-secondary/40')
          }
          onClick={() =>
            setPage((nextPage) => (hasNextPage() ? nextPage + 1 : nextPage))
          }
        >
          <BsChevronCompactDown size="2rem" />
        </div>
      </div>
      <div className="flex-1 h-auto">
        <FadeImage
          className="block object-cover w-full h-full p-0 m-0 select-none"
          src={previewImage.image}
          alt="Preview Image"
        />
      </div>
    </div>
  );
}

export default Gallery;
