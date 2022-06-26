<template>
  <div>
    <TopBar>
      <NuxtLink class="button text-white px-5 py-2 rounded-full flex items-center" :to="{name: 'index'}">
        <IconArrow class="mr-2" />
        Back
      </NuxtLink>
      <div class="ml-12">
        <h1 class="font-bold">
          {{ movie.title }}
        </h1>
        <div>{{ movie.tagline }}</div>
      </div>
    </TopBar>
    <div class="grid grid-cols-3 gap-14">
      <div class="col-span-1">
        <img :src="image.src" alt="movie.title" class="rounded-lg">
      </div>
      <div class="col-span-2">
        <div class="flex mb-5">
          <StarRating
            :item-size="20"
            :increment="0.5"
            read-only
            :show-rating="false"
            :rating="movie.vote_average/2"
          />
        </div>
        <div v-for="item in table.rows.items" :key="item.name" class="flex mb-3">
          <span class="font-medium">{{ item.name }}</span>
          <span class="ml-auto">{{ item.value }}</span>
        </div>
        <div v-for="item in table.rows.links" :key="item.name" class="flex mb-3">
          <span class="font-medium">{{ item.name }}</span>
          <a :href="item.href" class="ml-auto underline text-link">Link</a>
        </div>
      </div>
    </div>
    <p class="mt-12">
      {{ movie.overview }}
    </p>
    <div class="mt-16">
      <div class="font-bold">
        Credit:
      </div>
      <p class="text-sm">
        <template v-if="showMore || !credits.moreLength">
          {{ credits.all }}
        </template>
        <template v-else>
          {{ credits.topTen }}
          <span class="cursor-pointer text-link font-bold" @click="showMore=true">and {{ credits.moreLength }} more</span>
        </template>
      </p>
    </div>
  </div>
</template>

<script>
import { StarRating } from 'vue-rate-it'
import { theMovieDBApis } from '@/utils/apis'
import numberMixin from '@/mixins/numberMixin'
import timeMixin from '@/mixins/timeMixin'

export default {
  name: 'MovieDetails',
  components: {
    StarRating
  },
  mixins: [numberMixin, timeMixin],
  async asyncData ({ $axios, params }) {
    let movie
    await $axios({
      baseURL: theMovieDBApis.baseUrl,
      url: theMovieDBApis.movie.details(params.id),
      params: {
        api_key: theMovieDBApis.apiKey,
        language: theMovieDBApis.language
      }
    }).then(({ data }) => {
      movie = data
    })
    return { movie }
  },
  data: () => ({
    movie: {},
    allCredits: [],
    showMore: false
  }),
  head () {
    return {
      title: this.movie.title
    }
  },
  computed: {
    image () {
      return {
        src: theMovieDBApis.image.baseUrl + theMovieDBApis.image.sizes.w440andH660 + this.movie.poster_path
      }
    },
    table () {
      return {
        rows: {
          items: [
            {
              name: 'Budget',
              value: this.numberSeparator(this.movie.budget, '\'', '$')
            },
            {
              name: 'Revenue',
              value: this.numberSeparator(this.movie.revenue, '\'', '$')
            },
            {
              name: 'Release Date',
              value: this.movie.release_date
            },
            {
              name: 'Runtime',
              value: process.client ? this.convertMinutesToDuration(this.movie.runtime) : this.movie.runtime
            },
            {
              name: 'Score',
              value: `${this.movie.vote_average} (${this.movie.vote_count} votes)`
            },
            {
              name: 'Genres',
              value: process.client ? this.movie.genres.map(genre => genre.name).toString().replaceAll(',', ', ') : this.movie.genres.map(genre => genre.name).toString()
            }
          ],
          links: [
            {
              name: 'IMDB Link',
              href: this.movie.homepage
            },
            {
              name: 'Homepage Link',
              href: this.movie.homepage
            }
          ]
        }
      }
    },
    credits () {
      const credits = {
        all: '',
        topTen: '',
        more: '',
        moreLength: 0
      }
      if (this.allCredits.length) {
        credits.all = this.allCredits.toString().replaceAll(',', ' , ')
        credits.topTen = this.allCredits.filter((_, index) => index < 10).toString().replaceAll(',', ' , ')
        const more = this.allCredits.filter((_, index) => index > 9)
        credits.moreLength = more.length
        credits.more = more.toString().replaceAll(',', ' , ')
      }
      return credits
    }
  },
  mounted () {
    this.fetchCredits(this.$route.params.id)
  },
  methods: {
    fetchCredits (movieId) {
      this.$axios({
        baseURL: theMovieDBApis.baseUrl,
        url: theMovieDBApis.movie.credits(movieId),
        params: {
          api_key: theMovieDBApis.apiKey,
          language: theMovieDBApis.language
        }
      }).then(({ data }) => {
        this.allCredits = data.cast.sort((a, b) => a.popularity < b.popularity ? 1 : -1).map(cast => cast.name)
      })
    }
  }
}
</script>

<style scoped>
.text-link {
  color: #318FE7;
}
</style>
