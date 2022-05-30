import { AuthService } from './api/auth';

export class CartService {
  constructor() {
    this.api = new AuthService();
  }

  async fetchCart() {
    const { data } = await this.api.get('/api/user/cart');
    return data;
  }

  async addCart(product) {
    const { data } = await this.api.post('/api/user/cart', {
      product_variant_id: product.variant_id,
      quantity: product.cart_quantity,
    });
    return data;
  }

  async removeProduct(variant_id) {
    const { data } = await this.api.delete('/api/user/cart/' + variant_id);
    return data;
  }

  async updateQuantity(product, newCartQuantity) {
    const { data } = await this.api.put(
      '/api/user/cart/' + product.variant_id,
      { quantity: newCartQuantity }
    );
    return data;
  }

  async updateCart(products) {
    const { data } = await this.api.put('/api/user/cart', {
      products: products.map((product) => ({
        product_variant_id: product.variant_id,
        quantity: product.cart_quantity,
      })),
    });

    return data;
  }
}
