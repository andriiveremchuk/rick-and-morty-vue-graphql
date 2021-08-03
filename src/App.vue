<template>
  <div id="app">
    <v-app>
      <Header :favourite-characters="numberOfFavouriteCharacters" />
      <router-view @storage-updated="updateFavourites" />
    </v-app>
  </div>
</template>

<script>
  import Header from '@/components/shared/Header.vue'
  import { ref } from '@vue/composition-api'
  import { useSessionStorage } from '@/hooks/useSessionStorage'

  const STORAGE_KEY = 'favouriteIDs'

  export default {
    name: 'App',
    components: {
      Header
    },
    setup() {
      const { getItemFromSessionStorage } = useSessionStorage()

      const numberOfFavouriteCharacters = ref(
        (getItemFromSessionStorage(STORAGE_KEY) && getItemFromSessionStorage(STORAGE_KEY).length) ||
          0
      )

      function updateFavourites() {
        numberOfFavouriteCharacters.value =
          (getItemFromSessionStorage(STORAGE_KEY) &&
            getItemFromSessionStorage(STORAGE_KEY).length) ||
          0
      }

      return {
        numberOfFavouriteCharacters,
        updateFavourites
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
