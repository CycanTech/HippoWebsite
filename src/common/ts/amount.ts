import JSBI from 'jsbi'

export function parseAmount(amount = '1', decimal = 18) {
  if (!amount) return '0'

  amount = cleanupAmount(amount)

  const split = amount.split('.')
  const wholePart = split[0]
  const fracPart = split[1] || ''
  if (split.length > 2 || fracPart.length > decimal) {
    throw new Error(`Cannot parse '${amount}' as bignumber`)
  }
  return trimLeadingZeroes(wholePart + fracPart.padEnd(decimal, '0'))
}

export function formatAmount(balance: string | number, decimal = 18) {
  const balanceBN = JSBI.BigInt(balance)
  balance = balanceBN.toString()
  const wholeStr = balance.substring(0, balance.length - decimal) || '0'
  const fractionStr = balance
    .substring(balance.length - decimal)
    .padStart(decimal, '0')
    .substring(0, decimal)

  return trimTrailingZeroes(`${wholeStr}.${fractionStr}`)
}

export function amountToDecimal(amount: string) {
  const reg = /([0-9]+\.[0-9]{2})[0-9]*/
  return amount.replace(reg, '$1')
}
/**
 * Removes commas from the input
 * @param amount A value or amount that may contain commas
 * @returns string The cleaned value
 */
function cleanupAmount(amount: string) {
  return amount.replace(/,/g, '').trim()
}
/**
 * Removes .000… from an input
 * @param value A value that may contain trailing zeroes in the decimals place
 * @returns string The value without the trailing zeros
 */
function trimTrailingZeroes(value: string) {
  return value.replace(/\.?0*$/, '')
}
/**
 * Removes leading zeroes from an input
 * @param value A value that may contain leading zeroes
 * @returns string The value without the leading zeroes
 */
function trimLeadingZeroes(value: string) {
  value = value.replace(/^0+/, '')
  return value
}
