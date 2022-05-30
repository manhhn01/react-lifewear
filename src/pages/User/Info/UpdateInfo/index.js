import React, { useEffect, useState } from 'react';
import useTitle from '../../../../hooks/useTitle';
import Input from '../../../../components/Input';
import RadioButton from '../../../../components/Input/RadioButton';
import { AuthService } from '../../../../services/api/auth';
import { UserService } from '../../../../services/user';
import toast from 'react-hot-toast';
import { imageUrl } from '../../../../utils';

function UpdateInfo() {
  useTitle('Cập nhật tài khoản');
  const [info, setInfo] = useState({ gender: 1 });
  const [newInfo, setNewInfo] = useState({});
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const auth = new AuthService();
    auth.user().then((data) => setInfo(data));
    return () => auth.abort();
  }, []);
  const handleUpdateInfo = async () => {
    if (Object.keys(newInfo).length === 0) return;
    const user = new UserService();
    const result = await user.update(newInfo);
    if (result.validateErrors) {
      setErrors(result.validateErrors);
    }
    if (result.error) {
      toast.error(result.error);
    }
    if (result.message) {
      toast.success(result.message);
    }
  };
  return (
    <>
      <div className="flex">
        {/* Row 1 */}
        <div className="flex-1">
          <div className="flex flex-1">
            <Input
              className="flex-1"
              label="Họ"
              defaultValue={info.last_name}
              onChange={(event) => {
                setNewInfo((s) => ({ ...s, lastName: event.target.value }));
                setErrors((s) => ({ ...s, lastName: '' }));
              }}
              error={errors.lastName}
            />
            <Input
              className="flex-1 ml-5"
              label="Tên"
              defaultValue={info.first_name}
              onChange={(event) => {
                setNewInfo((s) => ({ ...s, firstName: event.target.value }));
                setErrors((s) => ({ ...s, firstName: '' }));
              }}
              error={errors.firstName}
            />
          </div>
          <Input
            className="flex-1"
            label="Email"
            defaultValue={info.email}
            onChange={(event) => {
              setNewInfo((s) => ({ ...s, email: event.target.value }));
              setErrors((s) => ({ ...s, email: '' }));
            }}
            error={errors.email}
          />
          <Input
            className="flex-1"
            label="Số điện thoại"
            defaultValue={info.phone}
            onChange={(event) => {
              setNewInfo((s) => ({ ...s, phone: event.target.value }));
              setErrors((s) => ({ ...s, phone: '' }));
            }}
            error={errors.phone}
          />
          <div className="block ml-2 text-lg font-medium text-gray-600">
            Giới tính
          </div>
          <div className="flex mb-2">
            <RadioButton
              className="w-1/2 text-center"
              title="Nam"
              name="gender"
              checked={info.gender === null || info.gender === 1}
              onChange={(event) => {
                setInfo((s) => ({
                  ...s,
                  gender: event.target.checked ? 0 : 1,
                }));
                setNewInfo((s) => ({
                  ...s,
                  gender: event.target.checked ? 0 : 1,
                }));
              }}
            />
            <RadioButton
              className="w-1/2 ml-5 text-center"
              title="Nữ"
              name="gender"
              checked={info.gender === 0}
              onChange={(event) => {
                setInfo((s) => ({
                  ...s,
                  gender: event.target.checked ? 0 : 1,
                }));
                setNewInfo((s) => ({
                  ...s,
                  gender: event.target.checked ? 0 : 1,
                }));
              }}
            />
          </div>
          {/* <div className="block ml-2 text-lg font-medium text-gray-600">
            Ngày sinh
          </div>
          <Input
            className="flex-1"
            type="date"
            defaultValue={info.dob}
            onChange={(event) =>
              setNewInfo((s) => ({ ...s, dob: event.target.value }))
            }
          /> */}
          <div className="mt-10 text-right">
            <button
              type="button"
              className="px-6 py-2 text-white border-none rounded-md outline-none bg-secondary disabled:bg-gray-300"
              disabled={Object.keys(newInfo).length === 0}
              onClick={handleUpdateInfo}
            >
              Lưu
            </button>
          </div>
        </div>
        {/* /Row 1 */}
        {/* Row 2 */}
        <div className="pl-10 ml-10 border-l w-80">
          <label className="inline-block mb-2 text-gray-500">
            Ảnh đại diện
          </label>
          <div className="flex items-center justify-center w-full mb-2">
            <label className="flex flex-col w-full min-h-[8rem] transition-colors border-2 border-gray-300 border-dashed hover:border-orange-300 hover:bg-gray-50">
              {newInfo.avatar ? (
                <div className="relative pt-[100%]">
                  <img
                    src={imageUrl(newInfo.avatar)}
                    className="absolute top-0 right-0 object-cover w-full h-full"
                    alt="avatar"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Chọn một file
                  </p>
                </div>
              )}
              <input
                type="file"
                accept=".jpg,jpeg,.png"
                className="hidden"
                onChange={({ target }) => {
                  const file = target.files[0];
                  new UserService()
                    .uploadAvatar(file)
                    .then(({ data }) =>
                      setNewInfo((s) => ({ ...s, avatar: data.filename }))
                    );
                }}
              />
            </label>
          </div>
          <div className="text-center text-gray-400">Định dạng: PNG, JPEG</div>
        </div>
        {/* /Row 2 */}
      </div>
    </>
  );
}

export default UpdateInfo;
