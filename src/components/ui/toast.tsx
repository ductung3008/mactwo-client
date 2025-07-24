'use client';

import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

// Toast Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

// Toast Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Item Component
interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300); // Animation duration
  }, [onRemove, toast.id]);

  useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, handleClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className='h-5 w-5 text-green-600' />;
      case 'error':
        return <AlertCircle className='h-5 w-5 text-red-600' />;
      case 'warning':
        return <AlertTriangle className='h-5 w-5 text-yellow-600' />;
      case 'info':
        return <Info className='h-5 w-5 text-blue-600' />;
      default:
        return <Info className='h-5 w-5 text-gray-600' />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-l-green-500';
      case 'error':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <div
      className={`mb-3 transform transition-all duration-300 ease-in-out ${
        isVisible && !isExiting
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      } `}
    >
      <div
        className={`relative w-full max-w-sm rounded-lg border-l-4 bg-white p-4 shadow-lg ${getBorderColor()} `}
      >
        <div className='flex items-start'>
          <div className='flex-shrink-0'>{getIcon()}</div>
          <div className='ml-3 flex-1'>
            <h4 className='text-sm font-semibold text-gray-900'>
              {toast.title}
            </h4>
            {toast.message && (
              <p className='mt-1 text-sm text-gray-600'>{toast.message}</p>
            )}
            {toast.action && (
              <div className='mt-3'>
                <button
                  onClick={toast.action.onClick}
                  className='text-sm font-medium text-blue-600 transition-colors hover:text-blue-500'
                >
                  {toast.action.label}
                </button>
              </div>
            )}
          </div>
          <div className='ml-4 flex-shrink-0'>
            <button
              onClick={handleClose}
              className='inline-flex text-gray-400 transition-colors hover:text-gray-500'
            >
              <span className='sr-only'>Close</span>
              <X className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Container
interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className='fixed top-4 right-4 z-50 space-y-2'>
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

// Toast Provider
interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000, // Default 5 seconds
    };

    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, clearAllToasts }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast hook for easier usage
export const useToastNotification = () => {
  const { addToast, removeToast, clearAllToasts } = useToast();

  return {
    success: useCallback(
      (title: string, message?: string, options?: Partial<Toast>) => {
        addToast({
          type: 'success',
          title,
          message,
          duration: 5000,
          ...options,
        });
      },
      [addToast]
    ),

    error: useCallback(
      (title: string, message?: string, options?: Partial<Toast>) => {
        addToast({
          type: 'error',
          title,
          message,
          duration: 7000, // Longer for errors
          ...options,
        });
      },
      [addToast]
    ),

    warning: useCallback(
      (title: string, message?: string, options?: Partial<Toast>) => {
        addToast({
          type: 'warning',
          title,
          message,
          duration: 6000,
          ...options,
        });
      },
      [addToast]
    ),

    info: useCallback(
      (title: string, message?: string, options?: Partial<Toast>) => {
        addToast({
          type: 'info',
          title,
          message,
          duration: 5000,
          ...options,
        });
      },
      [addToast]
    ),

    remove: removeToast,
    clearAll: clearAllToasts,
  };
};
