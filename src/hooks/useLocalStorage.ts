/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StoredValue } from "../types";

/**
 * Interface for localStorage hook utility.
 */
interface UseLocalStorage {
    /**
     * Sets an item in localStorage.
     * @param storeKey - The key under which the value is stored.
     * @param storeValue - The value to store (must be serializable).
     */
    setLocalStorageItem: (storeKey: string, storeValue: StoredValue) => void;

    /**
     * Retrieves an item from localStorage.
     * @param storeKey - The key of the item to retrieve.
     * @returns The parsed value or null if not found or parsing fails.
     */
    getLocalStorageItem: (storeKey: string) => StoredValue | null;

    /**
     * Removes an item from localStorage.
     * @param storeKey - The key of the item to remove.
     */
    removeLocalStorageItem: (storeKey: string) => void;

    /**
     * Clears all items from localStorage.
     */
    clearLocalStorage: () => void;
}

/**
 * Custom hook for interacting with browser localStorage.
 * @returns An object containing functions to manipulate localStorage.
 */
export const useLocalStorage = (): UseLocalStorage => {

    /**
     * Stores a value in localStorage after serializing it to JSON.
     * @param storeKey - The key to store the value under.
     * @param storeValue - The value to store.
     */
    const setLocalStorageItem = (storeKey: string, storeValue: StoredValue): void => {
        try {
            const serializedValue = JSON.stringify(storeValue);
            localStorage.setItem(storeKey, serializedValue);
        } catch (error) {
            throw new Error("Error serializing value to localStorage");
        }
    };

    /**
     * Retrieves and parses a value from localStorage.
     * @param storeKey - The key of the value to retrieve.
     * @returns The parsed value or null if parsing fails or value doesn't exist.
     */
    const getLocalStorageItem = <T extends StoredValue>(storeKey: string): T | null => {
        try {
            const item = localStorage.getItem(storeKey);
            return item ? JSON.parse(item) as T : null;
        } catch (error) {
            return null;
        }
    };

    /**
     * Removes an item from localStorage by key.
     * @param storeKey - The key of the item to remove.
     */
    const removeLocalStorageItem = (storeKey: string): void => {
        localStorage.removeItem(storeKey);
    };

    /**
     * Clears all entries from localStorage.
     */
    const clearLocalStorage = (): void => {
        localStorage.clear();
    };

    return {
        setLocalStorageItem,
        getLocalStorageItem,
        removeLocalStorageItem,
        clearLocalStorage,
    };
};
