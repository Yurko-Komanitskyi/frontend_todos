/* eslint-disable import/no-extraneous-dependencies */
import { Bounce, toast, ToastOptions, ToastPosition } from 'react-toastify';

export const ToastNotification = (
  type: 'info' | 'success' | 'warning' | 'error',
  text: string,
): void => {
  const options: ToastOptions = {
    position: 'top-right' as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  };

  switch (type) {
    case 'info':
      toast.info(text, options);
      break;
    case 'success':
      toast.success(text, options);
      break;
    case 'warning':
      toast.warn(text, options);
      break;
    case 'error':
      toast.error(text, options);
      break;
    default:
      toast(text, options);
  }
};
