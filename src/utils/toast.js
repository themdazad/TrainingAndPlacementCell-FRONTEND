/**
 * Toast utility using sonner
 * Provides a consistent toast interface across the app
 * Can be easily swapped with another toast library
 */
import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (message, options = {}) => {
    sonnerToast.success(message, options);
  },

  error: (message, options = {}) => {
    sonnerToast.error(message, options);
  },

  warning: (message, options = {}) => {
    sonnerToast.warning(message, options);
  },

  info: (message, options = {}) => {
    sonnerToast.info(message, options);
  },

  // Default toast
  default: (message, options = {}) => {
    sonnerToast(message, options);
  },

  // Promise-based toast (loading -> success/error)
  promise: (promise, messages = {}) => {
    return sonnerToast.promise(promise, messages);
  },

  // Loading toast
  loading: (message, options = {}) => {
    return sonnerToast.loading(message, options);
  },

  // Dismiss toast
  dismiss: (toastId) => {
    sonnerToast.dismiss(toastId);
  },
};

export default toast;
