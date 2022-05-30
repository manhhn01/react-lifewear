import { removeAscent } from '../utils';
import ApiService from './api';
import { AuthService } from './api/auth';

export class OrderService {
  constructor(auth = false) {
    this.api = auth ? new AuthService() : new ApiService();
  }

  async placeOrder(orderInfo, cartProducts) {
    Object.keys(orderInfo).map(
      (key) => (orderInfo[key] = orderInfo[key].toString().trim())
    );
    const validateErrors = this.validateOrderInfo(orderInfo);
    if (Object.keys(validateErrors).length > 0) {
      return { validateErrors, message: '' };
    } else {
      try {
        const { data } = await this.api.post('/api/checkout', {
          first_name: orderInfo.firstName,
          last_name: orderInfo.lastName,
          phone: orderInfo.phone,
          address: orderInfo.address,
          ward_id: orderInfo.wardId,
          payment_method: orderInfo.paymentMethod,
          cart: cartProducts,
          address_id: orderInfo.savedAddress,
          saveAddress: orderInfo.saveAddress,
        });
        return data;
      } catch (err) {
        return { error: err.message };
      }
    }
  }

  validateOrderInfo(orderInfo) {
    let errors = {};

    if (orderInfo.savedAddress === '') {
      errors.savedAddress = 'Vui lòng chọn địa chỉ nhận hàng';
    } else if (orderInfo.savedAddress === 'new') {
      if (orderInfo.firstName.trim() === '')
        errors.firstName = 'Vui lòng nhập họ người nhận';
      else if (
        !/^([A-Z]{1}[a-z\s]*)+$/g.test(removeAscent(orderInfo.firstName))
      ) {
        errors.firstName =
          'Vui lòng nhập tên hợp lệ! (Chỉ bao gồm chữ cái và khoảng trắng, viết hoa chữ cái đầu)';
      }

      if (orderInfo.lastName.trim() === '')
        errors.lastName = 'Vui lòng nhập tên người nhận';
      else if (
        !/^([A-Z]{1}[a-z\s]*)+$/g.test(removeAscent(orderInfo.lastName))
      ) {
        errors.lastName =
          'Vui lòng nhập tên hợp lệ! (Chỉ bao gồm chữ cái và khoảng trắng, viết hoa chữ cái đầu)';
      }

      if (orderInfo.phone.trim() === '')
        errors.phone = 'Vui lòng nhập số điện thoại';
      else if (!/^[0-9]{10,13}$/g.test(orderInfo.phone)) {
        errors.phone = 'Vui lòng nhập số điện thoại hợp lệ!';
      }

      if (orderInfo.address.trim() === '')
        errors.address = 'Vui lòng nhập địa chỉ giao hàng';

      if (!orderInfo.provinceId) {
        errors.province = 'Vui lòng chọn tỉnh/thành';
      }

      if (!orderInfo.districtId) {
        errors.district = 'Vui lòng chọn quận/huyện';
      }

      if (!orderInfo.wardId) {
        errors.ward = 'Vui lòng chọn phường/xã';
      }

      if (!orderInfo.paymentMethod) {
        errors.paymentMethod = 'Vui lòng chọn phương thức thanh toán';
      }
    }

    return errors;
  }
}
