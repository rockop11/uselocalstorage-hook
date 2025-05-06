import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage.ts', () => {

    const { 
        setLocalStorageItem, 
        getLocalStorageItem, 
        removeLocalStorageItem,
        clearLocalStorage
    } = useLocalStorage()

    test.each([
        {
            tested: { key: 'string', value: 'localStorageValue' },
            expected: 'localStorageValue',
            label: 'should set a string value in local Storage'
        },
        {
            tested: { key: 'number', value: 123 },
            expected: 123,
            label: 'should set a number in local storage'
        },
        {
            tested: { key: 'userData', value: { id: 1234, name: 'Rodrigo' } },
            expected: { id: 1234, name: 'Rodrigo' },
            label: 'should set an object in localStorage'
        },
        {
            tested: {
                key: 'products',
                value: [
                    { id: 'prod-1', title: 'product-1' },
                    { id: 'prod-2', title: 'product-2' }
                ]
            },
            expected: [
                { id: 'prod-1', title: 'product-1' },
                { id: 'prod-2', title: 'product-2' }
            ],
            label: 'should set an array in localStorage'
        },
        {
            tested: { key: 'boolean', value: true },
            expected: true,
            label: 'should set a boolean in local storage'
        }
    ])('$label', ({ tested, expected }) => {
        const { key, value } = tested
        setLocalStorageItem(key, value)
        const saved = localStorage.getItem(key)
        expect(saved).toBe(JSON.stringify(expected))
    });

    it('should call catch block when JSON.stringify fails', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const circular: any = {};
        circular.self = circular;

        expect(() => {
            setLocalStorageItem('key', circular);
        }).toThrow("Error serializing value to localStorage");
    });

    it('should get an item from local storage', () => {
        setLocalStorageItem('item', 'fakeItem')
        const getItemFromLocalStorage = getLocalStorageItem('item')
        expect(getItemFromLocalStorage).toBe("fakeItem")
    })

    it('should return null if item is not setted', () => {
        const getFakeItem = getLocalStorageItem('fakeItem')
        expect(getFakeItem).toBe(null)
    })

    it('should return null and trigger catch block on invalid JSON', () => {
        localStorage.setItem('invalidJSON', '{ invalid }')
        const result = getLocalStorageItem('invalidJSON')
        expect(result).toBeNull()
    })

    it('should remove an item from local storage', () => {
        setLocalStorageItem('key', 'value')
        const removedItem = removeLocalStorageItem('key')
        expect(removedItem).toBe(undefined)
    })

    it('should remove all items from local storage', () => {
        setLocalStorageItem('key', 'value')
        const removedItem = clearLocalStorage()
        expect(removedItem).toBe(undefined)
    })
})

// minuto 1:32 clase 11