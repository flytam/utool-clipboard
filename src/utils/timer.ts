export const wait = (time: number) => {
    return new Promise((res) => setTimeout(res, time))
}