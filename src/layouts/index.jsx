import React from 'react';
import NavigationBar from '../components/NavigationBar/index.jsx';

function Layout({ children, title, showBack = false, showHeart = false, location = false }) {
    return (
        <>
            <NavigationBar />
            <main>
                {children}
            </main>
        </>
    );
}

export default Layout; 