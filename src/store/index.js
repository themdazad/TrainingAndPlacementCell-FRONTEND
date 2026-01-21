export { store, default } from './store';
export * from './authSlice';
export { default as authReducer } from './authSlice';
export * from './uiSlice';
export { default as uiReducer } from './uiSlice';

/**
 * Store - Centralized Export
 * Explanation:
 * This file serves as a centralized export point for the Redux store and its slices.
 * It allows easy imports of the store, reducers, and actions from a single location.
 */
