<template>
  <div class="container max-w-6xl mx-auto py-16">
    <div class="grid grid-cols-3 gap-x-16 gap-y-6">
      <figure v-for="movie in movies" :key="movie.id" class="md:flex rounded-lg p-1 border">
        <img class="w-5/12 h-auto rounded-l-lg" :src="movie.poster_path" :alt="movie.title">
        <div class="p-2 grid grid-rows-3">
          <p class="font-bold row-span-2">
            {{ movie.title }}
          </p>
          <figcaption class="text-505050 text-xs">
            <div class="flex items-center">
              <IconCalendar class="mr-1" />
              {{ movie.release_date }}
            </div>
            <div class="mt-2">
              {{ movie.genres.toString().replaceAll(',', ' ● ') }}
            </div>
          </figcaption>
        </div>
      </figure>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { theMovieDBApis } from '~/utils/apis'

export default Vue.extend({
  name: 'HomePage',
  data () {
    return {
      image: {
        preUrl: theMovieDBApis.image.baseUrl + theMovieDBApis.image.sizes.w440andH660
      },
      response: {
        results: []
      },
      genres: []
    }
  },
  fetchOnServer: false,
  fetch () {
    // fetch genres
    this.$axios({
      baseURL: theMovieDBApis.baseUrl,
      url: theMovieDBApis.movie.genres,
      params: {
        api_key: theMovieDBApis.apiKey
      }
    }).then(({ data }) => {
      this.genres = data.genres
    })
    // fetch movies
    this.$axios({
      baseURL: theMovieDBApis.baseUrl,
      url: theMovieDBApis.movie.discover,
      params: {
        api_key: theMovieDBApis.apiKey
      }
    }).then(({ data }) => {
      this.response = data
    })
  },
  computed: {
    movies () {
      const genres = [...this.genres]
      return this.response.results.map((movie) => {
        movie.poster_path = this.image.preUrl + movie.poster_path
        movie.genres = movie.genre_ids.map(id => genres.find(genre => genre.id === id).name)
        return movie
      })
    }
  }
})
</script>

<style scoped>
figure {
  background-color: #F1F1F1;
  border-color: #C4C4C4;
}

.text-505050 {
  color: #505050;
}
</style>
