import { useSessionStorage } from '@/hooks/useSessionStorage'
import { ref } from '@vue/composition-api'

export const useFavouriteList = (context, storageKey = 'favouriteIDs') => {
  const { getItemFromSessionStorage, setItemToSessionStorage } = useSessionStorage()

  const favouriteIDs = ref(getItemFromSessionStorage(storageKey) || [])

  function addToFavourites(id) {
    const favouritesArray = getItemFromSessionStorage(storageKey) || []

    favouritesArray.push(id)

    setItemToSessionStorage(storageKey, favouritesArray)

    getIdsFromStorage()
  }

  function removeFromFavourites(id) {
    const favouritesArray = getItemFromSessionStorage(storageKey) || []

    const filteredFavouritesArray = favouritesArray.filter((favId) => favId !== id)

    setItemToSessionStorage(storageKey, filteredFavouritesArray)

    getIdsFromStorage()
  }

  function getIdsFromStorage() {
    favouriteIDs.value = getItemFromSessionStorage(storageKey) || []
    context.emit('storage-updated')
  }

  return {
    favouriteIDs,
    addToFavourites,
    removeFromFavourites
  }
}
