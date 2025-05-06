/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StoredValue } from "../types";

interface UseLocalStorage {
    setLocalStorageItem: (storeKey: string, storeValue: StoredValue) => void;
    getLocalStorageItem: (storeKey: string) => StoredValue | null;
    removeLocalStorageItem: (storeKey: string) => void;
    clearLocalStorage: () => void;
}

export const useLocalStorage = (): UseLocalStorage => {

    const setLocalStorageItem = (storeKey: string, storeValue: StoredValue): void => {
        try {
            const serializedValue = JSON.stringify(storeValue);
            localStorage.setItem(storeKey, serializedValue);
        } catch (error) {
            throw new Error("Error serializing value to localStorage");
        }
    };

    const getLocalStorageItem = <T extends StoredValue>(storeKey: string): T | null => {
        try {
            const item = localStorage.getItem(storeKey);
            return item ? JSON.parse(item) as T : null;
        } catch (error) {
            return null
        }
    };

    const removeLocalStorageItem = (storeKey: string): void => {
        localStorage.removeItem(`${storeKey}`)
    }

    const clearLocalStorage = (): void => {
        localStorage.clear()
    }

    return {
        setLocalStorageItem,
        getLocalStorageItem,
        removeLocalStorageItem,
        clearLocalStorage,
    }
}