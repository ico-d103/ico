export function isEndWithConsonant(korStr: string) {
    const finalChrCode = korStr.charCodeAt(korStr.length - 1)
    // 0 = 받침 없음, 그 외 = 받침 있음
    const finalConsonantCode = (finalChrCode - 44032) % 28
    return finalConsonantCode !== 0
};


export function appendEulReul(value: string) {
    if (!value) {
        return
    }
    return value + (isEndWithConsonant(value) ? "을" : "를")
};