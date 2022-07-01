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
        url="categories/nam"
        urlShowMore="/collections/nam"
        title="Áo Polo - Thoải mái tự tin mọi lúc mọi nơi"
      />
      <Section url="categories/nu" urlShowMore='/collections/nu' title="Khuyến mãi có hạn" />
    </>
  );
}

export default HomeSections;
