import Input from '../../../components/Input';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../reducer/authSlice';

function Login() {
  const [credential, setCredential] = useState({ email: null, password: null });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogin = () => {
    toast.promise(dispatch(loginUser(credential)).unwrap(), {
      loading: 'Đang đăng nhập...',
      success: ({ message }) => message,
      error: ({ message }) => message,
    });
  };

  const handleLoginWithProvider = (provider) => {
    toast.promise(dispatch(loginUser({ provider })).unwrap(), {
      loading: 'Đang đăng nhập...',
      success: ({ message }) => message,
      error: ({ message }) => message,
    });
  };

  return (
    <div
      className="flex justify-center h-screen min-h-[700px] items-baseline bg-center bg-no-repeat bg-cover -mt-12 -mb-10"
      style={{ backgroundImage: `url('/images/login_bg.jpg')` }}
    >
      <div className="max-w-full mx-10 mt-24 bg-white w-[600px] py-8 px-14 shadow-md rounded">
        <h1 className="mb-4 text-3xl font-bold tracking-wide text-center uppercase text-secondary">
          Đăng nhập
        </h1>
        <Input
          placeholder="Email"
          name="email"
          onChange={({ target }) => {
            setCredential({ ...credential, email: target.value });
          }}
        />
        <Input
          placeholder="Mật khẩu"
          name="password"
          type="password"
          onChange={({ target }) => {
            setCredential({ ...credential, password: target.value });
          }}
        />
        <button
          type="button"
          className="block w-full p-2 mb-3 text-xl text-center text-white transition-all duration-300 border-2 border-none rounded-sm outline-none hover:bg-secondary bg-secondary/80 disabled:bg-gray-400"
          onClick={handleLogin}
          disabled={auth.status === 'pending'}
        >
          Đăng nhập
        </button>
        <div className="mb-2 text-right text-accent">
          {/* <Link
            to="/user/forgot"
            className="transition-colors text-accent/80 hover:text-accents"
          >
            Quên mật khẩu
          </Link> */}
        </div>

        <div className="flex items-center my-5">
          <div className="flex-1 border-b h-[1px] border-b-gray-300"></div>
          <div className="mx-6 text-gray-300">HOẶC</div>
          <div className="flex-1 border-b h-[1px] border-b-gray-300"></div>
        </div>
        <div className="mb-4">
          <ul className="flex items-center justify-center">
            <li>
              <button
                className="flex items-center p-2 rounded-sm"
                onClick={() => {
                  handleLoginWithProvider('google');
                }}
              >
                <span
                  className="w-10 h-10 mx-2 bg-center bg-cover"
                  style={{ backgroundImage: `url('/images/google-logo.png')` }}
                ></span>
                <span>Google</span>
              </button>
            </li>
            <li>
              <Link
                to="facebook.com"
                className="flex items-center p-2 rounded-sm"
              >
                <span
                  className="w-10 h-10 mx-2 bg-center bg-cover"
                  style={{
                    backgroundImage: `url('/images/facebook-logo.png')`,
                  }}
                ></span>
                <span>Facebook</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-center">
          Bạn chưa có tài khoản?{' '}
          <Link
            to="/user/register"
            className="transition-colors text-secondary/80 hover:text-secondary"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
