<template>
  <div id="nav">
    <div class="links">
      <router-link to="/characters">Characters</router-link>
      <router-link to="/favourites">Favourites</router-link>
    </div>
    <div class="favouritesCounter">
      <v-icon color="white"> mdi-heart-outline </v-icon>
      {{ favouriteCharacters }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      favouriteCharacters: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style>
  #nav {
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    background-color: black;
  }

  .links {
    display: flex;
    gap: 10px;
  }

  .favouritesCounter {
    display: flex;
    align-items: center;
    color: #fff;
    gap: 5px;
  }

  #nav a {
    font-weight: bold;
    color: grey;
    text-decoration: none;
  }

  #nav a.router-link-active {
    color: #fff;
  }
</style>
