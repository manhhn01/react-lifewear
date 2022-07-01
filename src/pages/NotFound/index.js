import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="flex items-center h-full min-h-[calc(100vh_-_96px)] dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="mb-3 text-2xl font-semibold md:text-3xl">
            Trang bạn tìm kiếm không tồn tại
          </p>
          <Link
            rel="noopener noreferrer"
            to="/"
            className="px-8 py-3 font-semibold rounded text-secondary dark:bg-violet-400 dark:text-gray-900"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
