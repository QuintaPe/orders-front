import React from 'react';
import NavigationBar from '../components/NavigationBar/index.jsx';

function Layout({ children }) {
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