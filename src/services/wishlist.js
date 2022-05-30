import { AuthService } from './api/auth';

export class WishlistService {
  constructor() {
    this.auth = new AuthService();
  }

  async addWishlist(product) {
    const { data } = await this.auth.post('/api/user/wishlist', {
      product_id: product.id,
    });
    return data;
  }

  async removeWishlist(product_id) {
    const { data } = await this.auth.delete('/api/user/wishlist/' + product_id, {
      product_id,
    });
    return data;
  }

  async fetchWishlist() {
    const { data } = await this.auth.get('/api/user/wishlist');
    return data;
  }

  async updateWishlist(products) {
    const { data } = await this.auth.put('/api/user/wishlist', {
      products,
    });
    return data;
  }
}
