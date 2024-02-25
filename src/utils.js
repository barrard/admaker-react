export function readFromLocalStorage(key, defaultValue = null) {
    try {
        const jsonData = localStorage.getItem(key);
        if (jsonData === null) {
            console.log(`No data found in localStorage with key '${key}'`);
            return defaultValue;
        }

        const parsedData = JSON.parse(jsonData);
        console.log(`Data read from localStorage with key '${key}'`);
        return parsedData;
    } catch (error) {
        console.error("Error reading from localStorage:", error);
        return defaultValue;
    }
}
export function writeToLocalStorage(key, data) {
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
        console.log(`Data written to localStorage with key '${key}'`);
    } catch (error) {
        console.error("Error writing to localStorage:", error);
    }
}
