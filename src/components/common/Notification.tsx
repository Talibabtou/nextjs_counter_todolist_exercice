'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Notification as NotificationType } from '@/contexts/NotificationContext';

interface NotificationProps {
  notification: NotificationType;
  onRemove: (id: string) => void;
}

export default function Notification({ notification, onRemove }: NotificationProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getTypeClasses = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-success text-white border-success';
      case 'error':
        return 'bg-danger text-white border-danger';
      case 'warning':
        return 'bg-warning text-white border-warning';
      default:
        return 'bg-primary text-white border-primary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -300, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-sm ${getTypeClasses()}`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm">
          {notification.title}
        </h4>
        <p className="text-sm opacity-90 mt-1">
          {notification.message}
        </p>
      </div>
      
      <button
        onClick={() => onRemove(notification.id)}
        className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}
