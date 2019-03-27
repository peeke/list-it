export default function copyObjectWithGetterResults(obj) {
  const result = {}
  for (let key in obj) {
    result[key] = obj[key]
  }
  return result
}
