import { useState, useEffect } from 'react';

export const useDeviceType = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDeviceType = () => {
            const width = window.innerWidth;

            if (width < 768) {
                setIsMobile(true);
                setIsTablet(false);
                setIsDesktop(false);
            } else if (width >= 768 && width < 1024) {
                setIsMobile(false);
                setIsTablet(true);
                setIsDesktop(false);
            } else {
                setIsMobile(false);
                setIsTablet(false);
                setIsDesktop(true);
            }
        };

        // Check on mount
        checkDeviceType();

        // Add event listener for window resize
        window.addEventListener('resize', checkDeviceType);

        // Cleanup
        return () => window.removeEventListener('resize', checkDeviceType);
    }, []);

    return { isMobile, isTablet, isDesktop };
}; 