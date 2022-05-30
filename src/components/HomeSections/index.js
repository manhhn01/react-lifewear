import React from 'react';
import Section from './Section';

function HomeSections() {
  return (
    <>
      <Section
        url="products"
        urlShowMore="/hang-moi"
        title="Hàng mới về"
        description="Các sản phẩm bắt nhịp quốc tế, nàng thời thượng không nên bỏ lỡ"
      />
      <Section
        url="categories/2"
        urlShowMore="/collections/2"
        title="Áo Polo - Thoải mái tự tin mọi lúc mọi nơi"
      />
      <Section url="categories/6" urlShowMore='/collections/6' title="Khuyến mãi có hạn" />
    </>
  );
}

export default HomeSections;
