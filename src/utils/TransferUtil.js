function objTransfer (obj) {
  let objList = []
  for (let k in obj) {
    objList.push({ 'set': k, 'numbers': obj[k] })
  }
  return objList
}
function listTranfer (obj) {
  let objList = []
  for (let k in obj) {
    objList.push({ 'name': obj[k] })
  }
  return objList
}

export {
  objTransfer,
  listTranfer
}
