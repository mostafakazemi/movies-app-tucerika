const theMovieDB = {
  baseUrl: 'https=//api.themoviedb.org/3/',
  apiKey: 'f62f750b70a8ef11dad44670cfb6aa57',
  image: {
    base: 'https://image.tmdb.org/t/p/',
    sizes: {
      w440andH660: 'w440_and_h660_face',
      w1280: 'w1280'
    }
  }
}
export const theMovieDBApis = {
  ...theMovieDB,
  movie: {
    discover: `discover/movie?api_key=${theMovieDB.apiKey}`
  }
}
