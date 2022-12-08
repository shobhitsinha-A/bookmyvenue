import React from 'react';

export default () => {
    if (sessionStorage.getItem('user_name')) {
        return (
            <div>

            </div>
        );
    } else {
        window.location.href = '/login';
    }
}