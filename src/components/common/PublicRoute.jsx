import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../../common/functions';

const PublicRoute = ({ children }) => {
    const token = getAuthToken();

    if (token) {
        // Nếu đã đăng nhập, chuyển hướng về trang chủ
        return <Navigate to="/" replace />;
    }

    // Nếu chưa đăng nhập, cho phép truy cập trang login/register
    return children;
};

export default PublicRoute; 