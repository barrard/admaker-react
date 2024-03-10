export function readFromLocalStorage(key, defaultValue = null) {
    try {
        const jsonData = localStorage.getItem(key);
        if (jsonData === null) {
            // console.log(`No data found in localStorage with key '${key}'`);
            return defaultValue;
        }

        const parsedData = JSON.parse(jsonData);
        // console.log(`Data read from localStorage with key '${key}'`);
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
        // console.log(`Data written to localStorage with key '${key}'`);
    } catch (error) {
        console.error("Error writing to localStorage:", error);
    }
}

export const defaultPresets = {
    YUM: {
        activeWordColor: "#fcdc00",
        backgroundColor: "#fa28ff",
        fontSize: "24",
        lineHeight: "178",
        presetName: "YUM",
        strokeColor: "black",
        textStrokeThickness: 5,
        withActiveWordColor: true,
        withBackground: true,
        withSingleWord: true,
        withTextStroke: true,
        withWordAnimation: false,
        wordColor: "#ffffff",
        xAxis: 73,
        yAxis: 300,
        wordSpace: 10,
        enabled: true,
    },
    YUM2: {
        activeWordColor: "#fcdc00",
        backgroundColor: "#fa28ff",
        fontSize: "24",
        lineHeight: "178",
        presetName: "YUM2",
        strokeColor: "black",
        textStrokeThickness: 5,
        withActiveWordColor: true,
        withBackground: true,
        withSingleWord: false,
        withTextStroke: true,
        withWordAnimation: true,
        wordColor: "#ffffff",
        xAxis: 73,
        yAxis: 300,
        wordSpace: 20,
        enabled: true,
    },
    YUM3: {
        activeWordColor: "#fcdc00",
        backgroundColor: "#fa28ff",
        fontSize: "22",
        lineHeight: "178",
        presetName: "YUM3",
        strokeColor: "black",
        textStrokeThickness: 10,
        withActiveWordColor: true,
        withBackground: false,
        withSingleWord: true,
        withTextStroke: true,
        withWordAnimation: true,
        wordColor: "#ffffff",
        xAxis: 73,
        yAxis: 300,
        wordSpace: 20,
        enabled: true,
    },
};
