import React from 'react';

export default () => {
    sessionStorage.removeItem('user_name');
    window.location.href = '/login';
    return (
        <div></div>
    );
}
