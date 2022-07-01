import React, { useEffect, useMemo, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import Input from '../../components/Input';
import RadioButton from '../../components/Input/RadioButton';
import TextArea from '../../components/Input/TextArea';
import Select from '../../components/Input/Select';
import { currencyFormat } from '../../utils';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '../../components/Input/CheckBox';
import { DataService } from '../../services/data';
import { OrderService } from '../../services/order';
import toast from 'react-hot-toast';
import { emptyCart, updateCart } from '../../reducer/cartSlice';

function Checkout() {
  const navigate = useNavigate();

  const [savedAddressOptions, setSavedAddressOptions] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    savedAddress: '',
    saveAddress: false,
    paymentMethod: '',
    provinceId: '',
    districtId: '',
    wardId: '',
  });
  const [addressOptions, setAddressOptions] = useState({
    provinces: [],
    districts: [],
    wards: [],
  });
  const [errors, setErrors] = useState({
    savedAddress: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
  });

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const cartTotal = useMemo(
    () =>
      cart.products.reduce(
        (sum, current) =>
          (sum +=
            (current.sale_price || current.price) * current.cart_quantity),
        0
      ),
    [cart]
  );

  const handlePlaceOrder = async () => {
    const result = await new OrderService().placeOrder(
      orderInfo,
      cart.products
    );
    if (result.validateErrors) {
      return setErrors(result.validateErrors);
    }

    if (result.error) {
      return toast.error(result.error);
    }

    switch (orderInfo.paymentMethod) {
      case 'cod':
        if (result.status === 'success' && result.message) {
          toast.success('Đặt hàng thành công');
          navigate('/');
          dispatch(emptyCart({ logout: false }));
        }
        break;
      case 'momo':
        if (result.status === 'success' && result.pay_url) {
          const handleM2Message = (event) => {
            if (event.origin === 'http://localhost:8000') {
              if (event.data.status === 'success') {
                window.removeEventListener('message', handleM2Message);
                setOverlay(false);
                toast.success('Đặt hàng thành công');
                navigate('/');
                dispatch(emptyCart({ logout: false }));
              } else toast.error(event.data.error);
            }
          };
          window.addEventListener('message', handleM2Message);
          window.open(result.pay_url);
          setOverlay(true);
        } else toast.error('Có lỗi xảy ra. Vui lòng thử lại sau');
        break;
      case 'vnpay':
        break;
      default:
    }
  };

  useEffect(() => {
    const data = new DataService();
    data.getSubdivision().then((data) => {
      setAddressOptions((s) => ({
        provinces: data,
        districts: [],
        wards: [],
      }));
    });

    return () => data.api.abort();
  }, []);

  useEffect(() => {
    if (auth.logged) {
      const data = new DataService(true);
      data
        .getSavedAddressOptions()
        .then((data) => setSavedAddressOptions(data));
      return () => data.api.abort();
    } else {
      setOrderInfo((s) => ({ ...s, savedAddress: 'new' }));
    }
  }, [auth.logged]);

  useEffect(() => {
    const data = new DataService();
    if (orderInfo.provinceId) {
      data
        .getSubdivision('province', orderInfo.provinceId)
        .then((data) => setAddressOptions((s) => ({ ...s, districts: data })));
    }
    setOrderInfo((s) => ({ ...s, districtId: '', wardId: '' }));
    return () => data.api.abort();
  }, [orderInfo.provinceId]);

  useEffect(() => {
    const data = new DataService();
    if (orderInfo.districtId) {
      data
        .getSubdivision('district', orderInfo.districtId)
        .then((data) => setAddressOptions((s) => ({ ...s, wards: data })));
    }
    setOrderInfo((s) => ({ ...s, wardId: '' }));
    return () => data.api.abort();
  }, [orderInfo.districtId]);

  return cart.products.status !== 'pending' && cart.products.length === 0 ? (
    <Navigate to={'/'} replace />
  ) : (
    <>
      {overlay && (
        <div className="fixed top-0 right-0 z-50 flex flex-col items-center justify-center w-full h-full bg-gray-900/50">
          <span className="mb-10 text-2xl text-white uppercase">
            Vui lòng không đóng của sổ này
          </span>
          <div className="text-4xl text-white loading"></div>
        </div>
      )}
      <div
        className="min-h-screen -mt-24 pt-36"
        style={{ backgroundColor: '#f9fbfc' }}
      >
        <div className="container flex flex-wrap px-10 mx-auto">
          <div className="w-full lg:w-2/3 lg:pr-10">
            <div className="p-8 bg-white border rounded-md shadow-xl ">
              <Link
                to={'/cart'}
                className="flex mb-4 text-lg font-medium text-secondary-lighter"
              >
                <BiChevronLeft className="text-2xl" />
                Quay về
              </Link>
              <div>
                <h2 className="mt-5 mb-4 text-lg font-medium">
                  Thông tin giao hàng
                </h2>
                {auth.logged && (
                  <Select
                    onChange={({ target }) => {
                      setErrors((s) => ({ ...s, savedAddress: '' }));
                      setOrderInfo((s) => ({
                        ...s,
                        savedAddress: target.value,
                      }));
                    }}
                    value={orderInfo.savedAddress}
                    error={errors.savedAddress}
                  >
                    <option disabled value={''}>
                      --Chọn địa chỉ--
                    </option>

                    <option className="text-accent h-14" value="new">
                      Thêm địa chỉ mới
                    </option>

                    {savedAddressOptions.map((option) => (
                      <option
                        className="text-accent h-14"
                        value={option.id}
                        key={option.id}
                      >{`${option.last_name} ${option.first_name} - ${option.phone} - ${option.address}`}</option>
                    ))}
                  </Select>
                )}

                {(orderInfo.savedAddress === 'new' || !auth.logged) && (
                  <div className="mb-2">
                    <div className="flex">
                      <Input
                        placeholder="Họ"
                        className="flex-1 mr-3"
                        onChange={({ target }) => {
                          setErrors((s) => ({ ...s, lastName: '' }));
                          setOrderInfo((s) => ({
                            ...s,
                            lastName: target.value,
                          }));
                        }}
                        error={errors.lastName}
                      />
                      <Input
                        placeholder="Tên"
                        className="flex-1"
                        onChange={({ target }) => {
                          setErrors((s) => ({ ...s, firstName: '' }));
                          setOrderInfo((s) => ({
                            ...s,
                            firstName: target.value,
                          }));
                        }}
                        error={errors.firstName}
                      />
                    </div>
                    <Input
                      placeholder="Số điện thoại"
                      onChange={({ target }) => {
                        setErrors((s) => ({ ...s, phone: '' }));
                        setOrderInfo((s) => ({
                          ...s,
                          phone: target.value,
                        }));
                      }}
                      error={errors.phone}
                    />
                    <Input
                      placeholder="Địa chỉ"
                      error={errors.address}
                      value={orderInfo.address}
                      onChange={({ target }) => {
                        setOrderInfo((s) => ({ ...s, address: target.value }));
                      }}
                    />
                    <Select
                      onChange={({ target }) => {
                        setErrors((s) => ({ ...s, province: '' }));
                        setOrderInfo((s) => ({
                          ...s,
                          provinceId: target.value,
                        }));
                      }}
                      value={orderInfo.provinceId}
                      error={errors.province}
                    >
                      <option disabled value={''}>
                        --Tỉnh thành--
                      </option>
                      {addressOptions.provinces.map((address) => (
                        <option
                          className="text-accent h-14"
                          key={address.id}
                          value={address.id}
                        >
                          {address.name}
                        </option>
                      ))}
                    </Select>
                    <Select
                      onChange={({ target }) => {
                        setErrors((s) => ({ ...s, district: '' }));
                        setOrderInfo((s) => ({
                          ...s,
                          districtId: target.value,
                        }));
                      }}
                      disabled={!orderInfo.provinceId}
                      error={errors.district}
                      value={orderInfo.districtId}
                    >
                      <option disabled value={''}>
                        --Quận huyện--
                      </option>
                      {addressOptions.districts.map((address) => (
                        <option
                          className="text-accent"
                          key={address.id}
                          value={address.id}
                        >
                          {address.name}
                        </option>
                      ))}
                    </Select>
                    <Select
                      onChange={({ target }) => {
                        setErrors((s) => ({ ...s, ward: '' }));
                        setOrderInfo((s) => ({
                          ...s,
                          wardId: target.value,
                        }));
                      }}
                      error={errors.ward}
                      disabled={!orderInfo.districtId}
                      value={orderInfo.wardId}
                    >
                      <option disabled value={''}>
                        --Phường xã--
                      </option>
                      {addressOptions.wards.map((address) => (
                        <option
                          className="text-accent"
                          key={address.id}
                          value={address.id}
                        >
                          {address.name}
                        </option>
                      ))}
                    </Select>
                    <TextArea placeholder="Ghi chú (tùy chọn)" />
                    {auth.logged && (
                      <CheckBox
                        label="Lưu địa chỉ này cho các lần thanh toán sau"
                        onChange={({ target }) =>
                          setOrderInfo((s) => ({
                            ...s,
                            saveAddress: target.checked,
                          }))
                        }
                      />
                    )}
                  </div>
                )}

                <h2 className="mt-5 mb-4 text-lg font-medium">
                  Phương thức thanh toán
                </h2>
                <div
                  className="px-3 pt-3 -mx-3 border border-transparent"
                  style={{
                    borderColor: errors.paymentMethod ? '#bf4b1a' : null,
                  }}
                >
                  <RadioButton
                    icon={
                      <img
                        src="/images/icons/logomm1.webp"
                        className="object-contain mr-2 h-7 w-14"
                        alt="momo"
                      />
                    }
                    checked={orderInfo.paymentMethod === 'momo'}
                    onChange={({ target }) => {
                      if (target.checked) {
                        setErrors((s) => ({ ...s, paymentMethod: '' }));
                        setOrderInfo({
                          ...orderInfo,
                          paymentMethod: 'momo',
                        });
                      }
                    }}
                    name="momo"
                    title="Thanh toán qua ví MoMo"
                  />
                  {/* <RadioButton
                    icon={
                      <img
                        src="/images/icons/logovnpay.webp"
                        className="object-contain mr-2 h-7 w-14"
                        alt="qr_pay"
                      />
                    }
                    checked={orderInfo.paymentMethod === 'qr_pay'}
                    onChange={({ target }) => {
                      if (target.checked) {
                        setErrors((s) => ({ ...s, paymentMethod: '' }));
                        setOrderInfo({
                          ...orderInfo,
                          paymentMethod: 'qr_pay',
                        });
                      }
                    }}
                    name="qr_pay"
                    title="Thanh toán qua QR-Pay"
                  /> */}
                  <RadioButton
                    icon={
                      <img
                        src="/images/icons/payment.png"
                        className="object-contain mr-2 h-7 w-14"
                        alt="momo"
                      />
                    }
                    checked={orderInfo.paymentMethod === 'cod'}
                    onChange={({ target }) => {
                      if (target.checked) {
                        setErrors((s) => ({ ...s, paymentMethod: '' }));
                        setOrderInfo({
                          ...orderInfo,
                          paymentMethod: 'cod',
                        });
                      }
                    }}
                    name="cod"
                    title="Thanh toán khi giao hàng (COD)"
                  />
                </div>
                {errors.paymentMethod && (
                  <p className="mt-1 ml-2 text-sm text-secondary-darker/80">
                    {errors.paymentMethod}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="sticky p-5 bg-white border rounded-md shadow-xl top-28 ">
              <h3 className="mb-4 text-lg font-medium">Đơn hàng</h3>
              <ul className="flex flex-col pb-0 overflow-auto text-left max-h-[70vh]">
                {cart.products.map((product) => (
                  <li
                    className="flex mb-4 text-sm last:mb-0"
                    key={product.variant_id}
                  >
                    <div className="p-1 mr-2 border rounded">
                      <div
                        className="w-16 h-16"
                        style={{
                          backgroundImage: `url('${product.cover}')`,
                          backgroundSize: 'cover',
                        }}
                      ></div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <Link
                        to={'/' + product.slug}
                        onClick={() => {
                          // dispatch(hidePopup());
                        }}
                        className="h-5 mb-1 leading-5 text-truncate"
                      >
                        {product.name}
                      </Link>
                      <div>
                        <span className="font-semibold text-secondary">
                          {currencyFormat(product.sale_price || product.price) +
                            'đ'}
                        </span>
                        {!!product.sale_price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            {currencyFormat(product.price) + 'đ'}
                          </span>
                        )}
                      </div>
                      <div className="flex-1"></div>
                      <div className="flex items-center justify-between">
                        <div className="px-4 py-1 text-xs text-gray-700 bg-gray-100 rounded-sm self-baseline">
                          {product.color.name + ' / ' + product.size.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          SL: {product.cart_quantity}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="my-4 border-b"></div>
              <div className="flex justify-between text-sm text-gray-600">
                <div>Tạm tím</div>
                <div>{currencyFormat(cartTotal) + 'đ'}</div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <div>Phí vận chuyển</div>
                <div>0đ</div>
              </div>
              <div className="my-4 border-b"></div>
              <div className="flex justify-between mb-4 text-gray-700">
                <div>Tổng cộng</div>
                <div> {currencyFormat(cartTotal) + 'đ'}</div>
              </div>
              <button
                className="block px-8 py-2 mx-auto text-center transition-colors rounded tex-lg text-accent-lighter bg-secondary hover:bg-secondary-lighter"
                onClick={handlePlaceOrder}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
