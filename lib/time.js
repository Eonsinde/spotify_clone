export const convertMillisecsToStringTime = (milliSecs) => {
    const seconds = Math.floor(milliSecs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
        const remainingMinutes = minutes % 60
        if (remainingMinutes < 10)
            return hours + ":0" + remainingMinutes
        return hours + ":" + remainingMinutes
    } else if (minutes > 0) {
        const remainingSeconds = seconds % 60

        if (remainingSeconds < 10)
            return minutes + ":0" + remainingSeconds // 1:04
        return minutes + ":" + remainingSeconds // 2:15
    } else {
        return seconds + 'Secs'
    }

}