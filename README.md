# use-local-storage-hook

A simple and type-safe custom React hook for interacting with `localStorage`. Easily store, retrieve, and manage values in `localStorage` with built-in error handling.

## 🚀 Installation

```bash
npm i lib-uselocalstorage
```

## Usage

```tsx
import { useLocalStorage } from 'lib-uselocalstorage'

const MyComponent = () => {
  const {
    setLocalStorageItem,
    getLocalStorageItem,
    removeLocalStorageItem,
    clearLocalStorage,
  } = useLocalStorage();

  const handleSave = () => {
    setLocalStorageItem('user', { name: 'Alice', age: 30 });
  };

  const handleLoad = () => {
    const user = getLocalStorageItem('user');
    console.log(user);
  };

  const handleRemove = () => {
    removeLocalStorageItem('user');
  };

  const handleClear = () => {
    clearLocalStorage();
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
      <button onClick={handleRemove}>Remove</button>
      <button onClick={handleClear}>Clear All</button>
    </div>
  );
};
```

## 📦 API
```setLocalStorageItem(key: string, value: StoredValue): void```  
Stores a value under the specified key in localStorage. The value is automatically serialized to JSON.

```getLocalStorageItem<T>(key: string): T | null```  
Retrieves the value associated with the given key and deserializes it. Returns null if the key doesn't exist or parsing fails.

```removeLocalStorageItem(key: string): void```  
Removes the specified item from localStorage.

```clearLocalStorage(): void```  
Clears all keys and values from localStorage.


### 🧠 Type Safety
The hook is written in TypeScript and includes full type support, including generics when reading values from storage.

### 📁 Types 
You must define a StoredValue type that includes all valid types you expect to store. For example:
```ts
export type StoredValue = string | number | boolean | object | null;
```

### ✅ Features
TypeScript support

Fully typed get and set operations

Error handling during serialization/deserialization

Lightweight and dependency-free
