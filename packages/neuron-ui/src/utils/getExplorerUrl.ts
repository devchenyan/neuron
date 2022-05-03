export const getExplorerUrl = (isMainnet: boolean = true) => {
  return isMainnet ? 'https://explorer.nervos.org' : 'https://explorer.nervos.org/pudge'
}

export default getExplorerUrl
