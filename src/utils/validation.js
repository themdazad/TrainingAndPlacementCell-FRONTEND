/**
 * Form validation utility functions
 */

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Indian)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Password strength check
export const getPasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  if (strength <= 2) return { level: 'weak', color: 'red' };
  if (strength <= 4) return { level: 'medium', color: 'yellow' };
  return { level: 'strong', color: 'green' };
};

// Registration number validation
export const isValidRegistrationNumber = (regNo) => {
  // Adjust regex based on your college's registration number format
  const regNoRegex = /^[A-Z0-9]{6,15}$/i;
  return regNoRegex.test(regNo);
};

// CGPA validation
export const isValidCGPA = (cgpa) => {
  const value = parseFloat(cgpa);
  return !isNaN(value) && value >= 0 && value <= 10;
};

// URL validation
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// File size validation
export const isValidFileSize = (file, maxSizeInMB) => {
  const maxSize = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSize;
};

// File type validation
export const isValidFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

// Required field validation
export const isRequired = (value) => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined;
};

// Min length validation
export const hasMinLength = (value, minLength) => {
  return typeof value === 'string' && value.length >= minLength;
};

// Max length validation
export const hasMaxLength = (value, maxLength) => {
  return typeof value === 'string' && value.length <= maxLength;
};

// Form validation helper
export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = values[field];
    
    fieldRules.forEach((rule) => {
      if (errors[field]) return; // Skip if already has error
      
      switch (rule.type) {
        case 'required':
          if (!isRequired(value)) {
            errors[field] = rule.message || `${field} is required`;
          }
          break;
        case 'email':
          if (value && !isValidEmail(value)) {
            errors[field] = rule.message || 'Invalid email address';
          }
          break;
        case 'phone':
          if (value && !isValidPhone(value)) {
            errors[field] = rule.message || 'Invalid phone number';
          }
          break;
        case 'minLength':
          if (value && !hasMinLength(value, rule.value)) {
            errors[field] = rule.message || `Minimum ${rule.value} characters required`;
          }
          break;
        case 'maxLength':
          if (value && !hasMaxLength(value, rule.value)) {
            errors[field] = rule.message || `Maximum ${rule.value} characters allowed`;
          }
          break;
        case 'cgpa':
          if (value && !isValidCGPA(value)) {
            errors[field] = rule.message || 'CGPA must be between 0 and 10';
          }
          break;
        case 'url':
          if (value && !isValidURL(value)) {
            errors[field] = rule.message || 'Invalid URL';
          }
          break;
        case 'match':
          if (value !== values[rule.field]) {
            errors[field] = rule.message || `Does not match ${rule.field}`;
          }
          break;
        case 'custom':
          if (rule.validator && !rule.validator(value, values)) {
            errors[field] = rule.message || 'Invalid value';
          }
          break;
        default:
          break;
      }
    });
  });
  
  return errors;
};

export default {
  isValidEmail,
  isValidPhone,
  getPasswordStrength,
  isValidRegistrationNumber,
  isValidCGPA,
  isValidURL,
  isValidFileSize,
  isValidFileType,
  isRequired,
  hasMinLength,
  hasMaxLength,
  validateForm,
};
