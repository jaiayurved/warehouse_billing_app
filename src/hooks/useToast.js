// hooks/useToast.js
import { useState } from 'react';

export default function useToast() {
  const [toast, setToast] = useState('');

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2000);
  };

  const ToastComponent = () => {
    if (!toast) return null;
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#000',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: 20,
          fontSize: 14,
          zIndex: 1000,
        }}
      >
        {toast}
      </div>
    );
  };

  return { toast, showToast, ToastComponent };
}
