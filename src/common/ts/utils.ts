import { getAddress } from '@ethersproject/address'

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

export function getElementPosition(elementId: string) {
  let target: HTMLElement | null = document.getElementById(elementId)
  let currentLeft = 0
  let currentTop = 0

  if (target?.offsetParent) {
    currentLeft = target.offsetLeft
    currentTop = target.offsetTop
    while ((target = target?.offsetParent as HTMLElement)) {
      currentLeft += target.offsetLeft
      currentTop += target.offsetTop
    }
  }

  return { x: currentLeft, y: currentTop }
}

export function sleep(ms: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms)
  })
}

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  if (!address) {
    return ''
  }
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}
