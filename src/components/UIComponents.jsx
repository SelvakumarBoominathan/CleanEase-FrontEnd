/**
 * UI Components - Reusable UI components for the application
 * Includes loading indicators, error displays, empty states, etc.
 */

import React from "react";
import { AlertCircle, Loader } from "lucide-react";
import "../styles/components.css";

/**
 * Loading Spinner Component
 */
export const LoadingSpinner = ({
  size = "md",
  text = "Loading...",
  fullscreen = false,
}) => {
  const sizeClass = `spinner-${size}`;

  if (fullscreen) {
    return (
      <div className="loading-fullscreen">
        <div className={`spinner ${sizeClass}`}>
          <Loader size={size === "lg" ? 40 : size === "md" ? 32 : 24} />
        </div>
        {text && <p className="mt-md text-body">{text}</p>}
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className={`spinner ${sizeClass}`}>
        <Loader size={size === "lg" ? 40 : size === "md" ? 32 : 24} />
      </div>
      {text && <p className="mt-sm text-body-small">{text}</p>}
    </div>
  );
};

/**
 * Error Message Component
 */
export const ErrorMessage = ({ title, message, onRetry, icon = true }) => {
  return (
    <div className="error-container">
      {icon && (
        <div className="error-icon">
          <AlertCircle size={32} />
        </div>
      )}
      <div className="error-content">
        {title && <h4 className="error-title">{title}</h4>}
        {message && <p className="error-message">{message}</p>}
        {onRetry && (
          <button onClick={onRetry} className="btn btn-primary mt-md">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Empty State Component
 */
export const EmptyState = ({ icon: Icon, title, message, action }) => {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-state-icon">
          <Icon size={48} />
        </div>
      )}
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-message">{message}</p>}
      {action && <div className="mt-lg">{action}</div>}
    </div>
  );
};

/**
 * Success Message Component
 */
export const SuccessMessage = ({ message, icon = true }) => {
  return (
    <div className="alert alert-success">
      {icon && <div className="alert-icon">✓</div>}
      <span>{message}</span>
    </div>
  );
};

/**
 * Info Message Component
 */
export const InfoMessage = ({ message, icon = true }) => {
  return (
    <div className="alert alert-info">
      {icon && <div className="alert-icon">ℹ</div>}
      <span>{message}</span>
    </div>
  );
};

/**
 * Progress Bar Component
 */
export const ProgressBar = ({ value = 0, max = 100, animated = false }) => {
  const percentage = (value / max) * 100;

  return (
    <div className={`progress-bar ${animated ? "animated" : ""}`}>
      <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      {/* <span className="progress-label">{Math.round(percentage)}%</span> */}
    </div>
  );
};

/**
 * Badge Component
 */
export const Badge = ({ children, variant = "primary", size = "md" }) => {
  return (
    <span className={`badge badge-${variant} badge-${size}`}>{children}</span>
  );
};

/**
 * Divider Component
 */
export const Divider = ({ vertical = false, spacing = "md" }) => {
  return (
    <div
      className={`divider ${vertical ? "divider-vertical" : "divider-horizontal"} divider-${spacing}`}
    ></div>
  );
};

/**
 * Skeleton Loading Component
 */
export const Skeleton = ({
  width = "100%",
  height = "20px",
  className = "",
}) => {
  return (
    <div className={`skeleton ${className}`} style={{ width, height }}></div>
  );
};

/**
 * Card Component
 */
export const Card = ({
  children,
  header,
  footer,
  className = "",
  hoverable = true,
}) => {
  return (
    <div className={`card ${hoverable ? "hoverable" : ""} ${className}`}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

/**
 * Modal Overlay Component
 */
export const ModalBackdrop = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

/**
 * Toast Container Component
 * Note: This should be used at app root for react-hot-toast
 */
export const ToastContainer = () => {
  return <div className="toast-container"></div>;
};

/**
 * Pagination Component
 */
export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  maxVisible = 5,
}) => {
  const pages = [];
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        Previous
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="pagination-btn">
            1
          </button>
          {startPage > 2 && <span className="pagination-ellipsis">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-btn ${page === currentPage ? "active" : ""}`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="pagination-ellipsis">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="pagination-btn"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

/**
 * Rate Component (for displaying star ratings)
 */
export const Rating = ({ value = 0, max = 5, size = "md" }) => {
  return (
    <div className={`rating rating-${size}`}>
      {[...Array(max)].map((_, index) => (
        <span key={index} className={`star ${index < value ? "filled" : ""}`}>
          ★
        </span>
      ))}
    </div>
  );
};
