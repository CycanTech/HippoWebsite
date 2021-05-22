export function setItem(k: string, v: string) {
  try {
    window.localStorage.setItem(k, v)
  } catch (e) {
    console.log(`SetItem Error ${e}`)
  }
}

export function getItem(k: string): string | undefined {
  const v = window.localStorage.getItem(k)
  return v || undefined
}
