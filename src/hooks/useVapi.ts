import { useEffect } from 'react';
import { VAPI_CONFIG } from '../config/vapi';

export const useVapi = () => {
  useEffect(() => {
    const initializeVapi = () => {
      if (window.vapiSDK) {
        window.vapiInstance = window.vapiSDK.run({
          apiKey: VAPI_CONFIG.apiKey,
          assistant: VAPI_CONFIG.assistant,
          config: VAPI_CONFIG.buttonConfig,
        });
      }
    };

    if (document.readyState === 'complete') {
      initializeVapi();
    } else {
      window.addEventListener('load', initializeVapi);
      return () => window.removeEventListener('load', initializeVapi);
    }
  }, []);
};