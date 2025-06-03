// hooks/usePlatform.js
import { useState, useEffect } from 'react';

export const usePlatform = () => {
    const [platform, setPlatform] = useState({
        os: null,
        isElectron: false,
        isMac: false,
        isWindows: false,
        isLinux: false,
        isLoading: true,
    });

    useEffect(() => {
        const detectPlatform = () => {
            if (typeof window === 'undefined') return;
            let os = null;

            if (window.electron === undefined) {
                setPlatform({
                    os,
                    isElectron: false,
                    isMac: false,
                    isWindows: false,
                    isLinux: false,
                    isLoading: false,
                });
            }

            const isElectron = !!(window.electron || window.electron?.isDesktop);

            if (isElectron && window.electron?.platform) {
                os = window.electron.platform;
            } else {
                // Fallback detection
                const userAgent = window.navigator.userAgent.toLowerCase();
                if (userAgent.includes('mac')) os = 'darwin';
                else if (userAgent.includes('win')) os = 'win32';
                else if (userAgent.includes('linux')) os = 'linux';
            }

            setPlatform({
                os,
                isElectron,
                isMac: os === 'darwin',
                isWindows: os === 'win32',
                isLinux: os === 'linux',
                isLoading: false,
            });
        };

        detectPlatform();
    }, []);

    return platform;
};