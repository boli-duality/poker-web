/** 一维数组转二维数组 */
export function array2Matrix(arr: any[], n: number) {
  const matrix: any[][] = []
  const len = arr.length
  let i = 0
  while (i < len)
    matrix.push(arr.slice(i, (i += n)))

  return matrix
}
