export function filterMatches(needle, haystack) {
  console.log(needle, '---', haystack)
  // eslint-disable-next-line prefer-template
  const regex = new RegExp('^' + needle.toUpperCase().replace(/\*/g, '.') + '$')
  return haystack.filter(word => regex.test(word))
}
export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  )
}
