import { removeAscent } from '../utils';
import { AuthService } from './api/auth';

export class UserService {
  constructor() {
    this.api = new AuthService();
  }

  async update(userInfo) {
    console.log(userInfo);
    Object.keys(userInfo).map(
      (key) => (userInfo[key] = userInfo[key].toString().trim())
    );
    const validateErrors = this.validateInfo(userInfo);
    if (Object.keys(validateErrors).length > 0) {
      return { validateErrors, message: '' };
    } else {
      try {
        const requestBody = {};
        if (userInfo.firstName) requestBody.first_name = userInfo.firstName;
        if (userInfo.lastName) requestBody.last_name = userInfo.lastName;
        if (userInfo.phone) requestBody.phone = userInfo.phone;
        if (userInfo.email) requestBody.email = userInfo.email;
        if (userInfo.avatar) requestBody.avatar = userInfo.avatar;
        if (userInfo.gender) requestBody.gender = userInfo.gender;
        const { data } = await this.api.patch('/api/user', requestBody);
        return { data, message: 'Cập nhật thành công' };
      } catch (err) {
        return { error: err.message };
      }
    }
  }

  async getOrders(page = 1) {
    const { data } = await this.api.get('api/user/orders', {
      params: {
        page,
      },
    });
    return data;
  }

  async uploadAvatar(file) {
    try {
      const form = new FormData();
      form.append('image', file);
      const { data } = await this.api.post('/api/user/upload/avatar', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { data, message: 'Cập nhật thành công' };
    } catch (err) {
      return { error: err.message };
    }
  }

  validateInfo(userInfo) {
    let errors = {};
    if (userInfo.firstName)
      if (userInfo.firstName.trim() === '')
        errors.firstName = 'Vui lòng nhập họ';
      else if (
        !/^([A-Z]{1}[a-z\s]*)+$/g.test(removeAscent(userInfo.firstName))
      ) {
        errors.firstName =
          'Vui lòng nhập tên hợp lệ! (Chỉ bao gồm chữ cái và khoảng trắng, viết hoa chữ cái đầu)';
      }

    if (userInfo.lastName)
      if (userInfo.lastName.trim() === '')
        errors.lastName = 'Vui lòng nhập tên';
      else if (
        !/^([A-Z]{1}[a-z\s]*)+$/g.test(removeAscent(userInfo.lastName))
      ) {
        errors.lastName =
          'Vui lòng nhập tên hợp lệ! (Chỉ bao gồm chữ cái và khoảng trắng, viết hoa chữ cái đầu)';
      }

    if (userInfo.email)
      if (userInfo.email.trim() === '')
        errors.email = 'Vui lòng nhập địa chỉ email';
      else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo.email)) {
        errors.email = 'Vui lòng nhập địa chỉ email hợp lệ';
      }

    if (userInfo.phone)
      if (userInfo.phone.trim() === '')
        errors.phone = 'Vui lòng nhập số điện thoại';
      else if (!/^[0-9]{10,13}$/g.test(userInfo.phone)) {
        errors.phone = 'Vui lòng nhập số điện thoại hợp lệ!';
      }

    return errors;
  }
}
