/**
 * Form Validation Utilities
 */

/**
 * Email validation
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

/**
 * Password validation
 */
export const validatePassword = (password, minLength = 8) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
};

/**
 * Username validation
 */
export const validateUsername = (username) => {
  if (!username) {
    return 'Username is required';
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  if (username.length > 30) {
    return 'Username must be less than 30 characters';
  }
  if (!/^[\wáéíóúüñÁÉÍÓÚÜÑ]+$/.test(username)) {
    return 'Username must be a single word without spaces or special characters';
  }
  return null;
};

/**
 * Required field validation
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Generic form validator
 */
export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = values[field];
    
    if (rule.required && validateRequired(value, rule.label || field)) {
      errors[field] = validateRequired(value, rule.label || field);
      return;
    }
    
    if (value && rule.email && validateEmail(value)) {
      errors[field] = validateEmail(value);
      return;
    }
    
    if (value && rule.password && validatePassword(value, rule.minLength)) {
      errors[field] = validatePassword(value, rule.minLength);
      return;
    }
    
    if (value && rule.username && validateUsername(value)) {
      errors[field] = validateUsername(value);
      return;
    }
    
    if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
      return;
    }
    
    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${rule.label || field} must be less than ${rule.maxLength} characters`;
      return;
    }
    
    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${rule.label || field} format is invalid`;
      return;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

