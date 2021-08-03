export const useSessionStorage = () => {
  function getItemFromSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key)) || null
  }

  function setItemToSessionStorage(key, item) {
    return sessionStorage.setItem(key, JSON.stringify(item))
  }

  return {
    getItemFromSessionStorage,
    setItemToSessionStorage
  }
}
