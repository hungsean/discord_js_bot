module.exports = {
    timeToMicroSeconds(hour, minute, second) {
        return ((hour * 3600) + (minute * 60) + second) * 1000;
    }
};