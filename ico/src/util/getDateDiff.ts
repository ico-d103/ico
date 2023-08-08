export const getDateDiff = (d1: string, d2: null | string) => {
  const date1 = new Date(d1)
  let date2
  if (d2 !== null) {
    date2 = new Date(d2)
  } else {
    date2 = new Date()
  }

  const diffDate = date1.getTime() - date2.getTime()
  const result = diffDate > 0 ? Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24))) : 0

  return result
}