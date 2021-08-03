<template>
  <div class="wrapper">
    <template v-if="loading">
      <v-progress-circular
        class="loader"
        :size="40"
        indeterminate
        color="black"
      ></v-progress-circular>
    </template>
    <template v-if="!error && !loading">
      <v-card class="flex-grow-1" outlined>
        <v-card-title class="text-h4"> {{ character.name }} </v-card-title>
        <v-card-text class="d-flex flex-column align-baseline">
          <div>Status: {{ character.status }}</div>
          <div>Species: {{ character.species }}</div>
          <div>Last known location: {{ character.location }}</div>
          <div>First seen in: {{ character.episode }}</div>
        </v-card-text>
        <v-card-actions class="pa-4">
          <template v-if="favouriteIDs.includes(character.id)">
            <v-btn outlined @click="removeFromFavourites(id)" color="black">
              Remove From Favourites
            </v-btn>
          </template>
          <template v-else>
            <v-btn outlined @click="addToFavourites(id)"> Add To Favourites </v-btn>
          </template>
        </v-card-actions>
      </v-card>
      <v-avatar tile size="250">
        <v-img :src="character.image"></v-img>
      </v-avatar>
    </template>
  </div>
</template>

<script>
  import { useGetCharacterById } from '../graphql/hooks/useCharacterById'
  import { useFavouriteList } from '@/hooks/useFavouriteList'

  export default {
    name: 'CharacterDetailPage',
    setup(_, context) {
      const { id } = context.attrs

      const { favouriteIDs, addToFavourites, removeFromFavourites } = useFavouriteList(context)

      const { character = {}, loading, error } = useGetCharacterById(id)

      return {
        id,
        character,
        loading,
        error,
        favouriteIDs,
        addToFavourites,
        removeFromFavourites
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 20px 40px 0;
  }

  .loader {
    position: absolute;
    top: 25%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    text-align: center;
  }
</style>
