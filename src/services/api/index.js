import axios from 'axios';

export default class ApiService {
  constructor(config = {}) {
    this.controller = new AbortController();
    this.endpoint = process.env.REACT_APP_API_ENDPOINT;
    this.client = axios.create({
      baseURL: this.endpoint,
      timeout: 30000,
      headers: {
        Accept: 'application/json',
      },
      signal: this.controller.signal,
      withCredentials: true,
      ...config,
    });
  }

  abort() {
    this.controller.abort();
  }

  async get(...params) {
    try {
      return await this.client.get(...params);
    } catch (err) {
      if (axios.isCancel(err)) return;
      switch (err?.response?.status) {
        case 422:
          this.handleUnprocessableContent(err);
          break;
        default:
          throw err;
      }
    }
  }

  async post(...params) {
    try {
      return await this.client.post(...params);
    } catch (err) {
      if (axios.isCancel(err)) return;
      switch (err?.response?.status) {
        case 422:
          this.handleUnprocessableContent(err);
          break;
        case 419:
          await this.handleCSRFTokenMismatch();
          return await this.client.post(...params);
        default:
          throw err;
      }
    }
  }

  async put(...params) {
    try {
      return await this.client.put(...params);
    } catch (err) {
      if (axios.isCancel(err)) return;
      switch (err?.response?.status) {
        case 422:
          this.handleUnprocessableContent(err);
          break;
        case 419:
          await this.handleCSRFTokenMismatch();
          return await this.client.put(...params);
        default:
          throw err;
      }
    }
  }

  async patch(...params) {
    try {
      return await this.client.patch(...params);
    } catch (err) {
      if (axios.isCancel(err)) return;
      switch (err?.response?.status) {
        case 422:
          this.handleUnprocessableContent(err);
          break;
        case 419:
          await this.handleCSRFTokenMismatch();
          return await this.client.patch(...params);
        default:
          throw err;
      }
    }
  }

  async delete(...params) {
    try {
      return await this.client.delete(...params);
    } catch (err) {
      if (axios.isCancel(err)) return;
      switch (err?.response?.status) {
        case 422:
          this.handleUnprocessableContent(err);
          break;
        case 419:
          await this.handleCSRFTokenMismatch();
          return await this.client.delete(...params);
        default:
          throw err;
      }
    }
  }

  handleUnprocessableContent(err) {
    const errors = err?.response?.data?.errors;
    throw new Error(
      Object.entries(errors)
        .map(([key, value]) => value)
        .join('\n')
    );
  }

  async handleCSRFTokenMismatch() {
    await this.client.get('/sanctum/csrf-cookie');
  }
}
