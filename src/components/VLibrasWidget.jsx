import React, { useEffect } from 'react';

const VLibrasWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        script.async = true;
        script.onload = () => {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
};

export default VLibrasWidget;
