import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig} from 'axios';
import {BASE_URL} from './environment';
import {loginType, registerType, transactionType} from './types';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

class zwalletAPI {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  private _handleResponse = ({data}: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);
}

class unprotectedAPI extends zwalletAPI {
  public constructor() {
    super(BASE_URL);
  }

  public login = (body: loginType) => this.instance.post('/auth/login', body);
  public register = (body: registerType) =>
    this.instance.post('auth/register', body);
}

class protectedAPI extends zwalletAPI {
  public constructor() {
    super(BASE_URL);
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    config.headers['x-access-token'] = 'Bearer ...';

    return config;
  };
  public getTransactionHistory = (id: number) =>
    this.instance.get(`/transaction/${id}`);
  public doTransaction = (body: transactionType) =>
    this.instance.post('/transaction/send', body);
  public topUp = (body: transactionType) => {
    this.instance.post('/transaction/topup', body);
  };
  public addContact = (body: {user_id: string; contact_id: string}) =>
    this.instance.post('/user/contact', body);
  public getContact = (endpoint: string) => this.instance.get(endpoint);
}

export {unprotectedAPI, protectedAPI};
