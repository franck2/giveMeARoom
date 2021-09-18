
export const getDataFromLocalStorage = <T>(localStorageKey: string): T | null => {
    const item = localStorage.getItem(localStorageKey);

    if (!item) {
        return null;
    }

    return JSON.parse(item);
};

export const storeDataInLocalStorage = <T>(localStorageKey: string, item: T) => {
    localStorage.setItem(localStorageKey, JSON.stringify(item));
};
