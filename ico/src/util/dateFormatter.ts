export const dateFormatter = (value: string) => {
    const date = new Date(value)
	const mfDate = `${date.getFullYear()}년 ${("0" + (date.getMonth() + 1)).slice(-2)}월 ${("0" + date.getDate()).slice(-2)}일`
    return mfDate
}