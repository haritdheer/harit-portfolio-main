export const parseJSONArray = (jsonArray) => {
    const validJsonString = jsonArray?.replace(/'/g, '"');
    return JSON.parse(validJsonString);
}