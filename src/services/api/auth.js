import ApiService from '.';

export class AuthService extends ApiService {
  async user() {
    const { data } = await this.get('/api/user');
    return data;
  }

  async login({ email, password }) {
    await this.post('/api/login', {
      email,
      password,
    });
    let { data } = await super.get('/api/user');
    return data;
  }

  async register(registerInfo) {
    const response = await this.post('/api/register', registerInfo);
    if (response.status !== 201) {
      throw new Error('Đăng kí không thành công');
    }
  }

  async logout() {
    try {
      await super.post('/api/logout');
    } catch (error) {
      throw error;
    }
  }

  async loginWithProvider(provider) {
    await this.handleCSRFTokenMismatch();
    switch (provider) {
      case 'google':
        await new Promise((resolve, reject) => {
          const handleOAMessage = (event) => {
            if (event.origin === new URL(this.endpoint).origin) {
              if (event.data.status === 'success') {
                window.removeEventListener('message', handleOAMessage);
                resolve();
              }
            }
          };

          window.addEventListener('message', handleOAMessage);

          window.open(
            new URL('/api/auth/google/redirect', this.endpoint).href,
            '',
            'location=no,width=600,height=800,top=100,left=300'
          );
        });
        break;

      case 'facebook':
        super.get(`/api/auth/facebook/redirect`);
        break;
      default:
        throw new Error('Unknown provider: ' + provider);
    }
  }

  handleUnauthorized() {
    this.logout();
    throw new Error('Bạn đã bị đăng xuất. Vui lòng đăng nhập lại');
  }

  async get(...params) {
    try {
      return await super.get(...params);
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 401) {
        this.handleUnauthorized();
      } else throw err;
    }
  }

  async post(...params) {
    try {
      return await super.post(...params);
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 401) {
        this.handleUnauthorized();
      } else throw err;
    }
  }

  async put(...params) {
    try {
      return await super.put(...params);
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 401) {
        this.handleUnauthorized();
      } else throw err;
    }
  }

  async patch(...params) {
    try {
      return await super.patch(...params);
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 401) {
        this.handleUnauthorized();
      } else throw err;
    }
  }

  async delete(...params) {
    try {
      return await super.delete(...params);
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 401) {
        this.handleUnauthorized();
      } else throw err;
    }
  }
}
