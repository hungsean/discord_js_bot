module.exports = {
    collection2array(collection)
    {
        const array = [];
        for (const [key] of collection) {
            array.push(key);
        }
        return array;
    }
};