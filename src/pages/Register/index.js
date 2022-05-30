import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import RadioButton from '../../components/Input/RadioButton';
import { loginUser, registerUser } from '../../reducer/authSlice';

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    email: null,
    password: null,
    phone: null,
    first_name: null,
    last_name: null,
    gender: true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleRegister = () => {
    toast.promise(dispatch(registerUser(registerInfo)).unwrap(), {
      loading: 'Đang đăng kí tài khoản...',
      success: ({ message }) => {
        setTimeout(() => {
          navigate('/user/login');
        }, 1000);
        return message;
      },
      error: ({ message }) => message,
    });
  };

  return (
    <div
      className="flex justify-center h-screen items-baseline min-h-[700px] bg-center bg-no-repeat bg-cover -mt-12 -mb-10"
      style={{ backgroundImage: `url('/images/signup_bg.jpg')` }}
    >
      <div className="max-w-full mx-10 mt-24 bg-white w-[600px] py-8 px-14 shadow-md rounded">
        <h1 className="mb-4 text-3xl font-bold tracking-wide text-center uppercase text-secondary">
          Đăng ký
        </h1>
        <div className="flex w-full">
          <Input
            className="mr-2"
            placeholder="Họ"
            name="last_name"
            onChange={({ target }) => {
              setRegisterInfo({ ...registerInfo, last_name: target.value });
            }}
          />
          <Input
            className=""
            placeholder="Tên"
            name="first_name"
            onChange={({ target }) => {
              setRegisterInfo({ ...registerInfo, first_name: target.value });
            }}
          />
        </div>
        <Input
          placeholder="Email"
          name="new-email"
          autoComplete="new-password"
          onChange={({ target }) => {
            setRegisterInfo({ ...registerInfo, email: target.value });
          }}
        />
        <Input
          placeholder="Mật khẩu"
          name="new-password"
          type="password"
          autoComplete="new-password"
          onChange={({ target }) => {
            setRegisterInfo({ ...registerInfo, password: target.value });
          }}
        />
        <Input
          placeholder="Số điện thoại"
          name="phone"
          type="text"
          autoComplete="off"
          onChange={({ target }) => {
            // todo validate input
            setRegisterInfo({ ...registerInfo, phone: target.value });
          }}
        />
        <div className="flex mb-2">
          <RadioButton
            className="w-1/2 mr-2 text-center"
            title="Nam"
            name="gender"
            checked={registerInfo.gender}
            onChange={(event) =>
              setRegisterInfo({ ...registerInfo, gender: event.target.checked })
            }
          />
          <RadioButton
            className="w-1/2 text-center"
            title="Nữ"
            name="gender"
            checked={!registerInfo.gender}
            onChange={(event) =>
              setRegisterInfo({
                ...registerInfo,
                gender: !event.target.checked,
              })
            }
          />
        </div>
        <button
          type="button"
          className="block w-full p-2 mb-3 text-xl text-center text-white transition-all duration-300 border-2 border-none rounded-sm outline-none hover:bg-secondary bg-secondary/80 disabled:bg-gray-400"
          onClick={handleRegister}
          disabled={auth.status === 'pending'}
        >
          Đăng ký
        </button>
        <div className="text-center">
          Bạn đã có tài khoản?{' '}
          <Link
            to="/user/login"
            className="transition-colors text-secondary/80 hover:text-secondary"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
