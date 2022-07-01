import ApiService from './api';
import { AuthService } from './api/auth';

export class DataService {
  constructor(auth = false) {
    this.api = auth ? new AuthService() : new ApiService();
  }

  async getProducts({
    perpage = 20,
    page = 1,
    order,
    sortby,
    sizes = [],
    colors = [],
    category_id,
  }) {
    const { data } = await this.api.get('/api/products', {
      params: {
        perpage,
        page,
        sortby,
        category_id,
        order,
        size: sizes.join(','),
        color: colors.join(','),
      },
    });
    return data;
  }

  async getProduct(idSlug) {
    const { data } = await this.api.get('/api/products/' + idSlug);
    return data;
  }

  async getCategory(
    idSlug,
    {
      perpage = 20,
      order,
      sortby,
      sizes = [],
      colors = [],
      category_id,
      page = 1,
    }
  ) {
    const { data } = await this.api.get('/api/categories/' + idSlug, {
      params: {
        perpage,
        page,
        sortby,
        category_id,
        order,
        size: sizes.join(','),
        color: colors.join(','),
      },
    });
    return data;
  }

  async getReviews(idSlug) {
    const { data } = await this.api.get(`/api/products/${idSlug}/reviews`, {});
    console.log(data);
    return data;
  }

  async getCategories() {
    const { data } = await this.api.get('/api/categories');
    return data;
  }

  async searchProducts(keyword, { perpage = '' }) {
    const { data } = await this.api.get('/api/products/search', {
      params: {
        q: keyword,
        perpage,
      },
    });

    return data;
  }

  async getSubdivision(division, id) {
    let response;
    switch (division) {
      case 'province':
      case 'district':
        response = await this.api.get('/api/addresses/child_divisions', {
          params: {
            division_name: division,
            division_id: id,
          },
        });
        break;
      default:
        response = await this.api.get('/api/addresses/child_divisions');
    }

    return response.data;
  }

  async getSavedAddressOptions() {
    const { data } = await this.api.get('/api/user/addresses');
    return data;
  }
}
