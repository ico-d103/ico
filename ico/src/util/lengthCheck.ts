/**
 * string의 길이 validation을 검사하는 함수
 * @param string 검사할 string
 * @param min string의 최소 길이 (opt)
 * @param max string의 최대 길이 (opt)
 * @returns validation에 통과하면 true, 아니면 false
 */
export const lengthCheck = (string: string, min?: number, max?: number) => {
	if (min && max) {
		return string.length >= min && string.length <= max ? true : false
	} else {
		if (min) return string.length >= min ? true : false
		if (max) return string.length <= max ? true : false
	}
}
