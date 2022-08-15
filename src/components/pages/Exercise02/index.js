/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";

export default function Exercise02 () {
  const [movies, setMovies] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [genre, setGenre] = useState([])
  const [filterlist, setFilterlist] = useState([])

  const handleMovieFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setFilterlist(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      });

      setLoading(true)
      console.log('Genres')
      fetch('http://localhost:3001/genres')
      .then(res => res.json())
      .then(json => {
        setGenre(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('error generos')
      })
      console.log(JSON.stringify(genre))
  }

  const filter = ({target}) => {
    console.log('filtro')
    console.log(target.value)
    const seed = movies
    const newlist = seed.filter((mo) => mo.genres.includes(target.value));
    console.log(newlist)
    setFilterlist(newlist)

  }

  useEffect(() => {
    handleMovieFetch()
  }, [])

  return (
    <section className="movie-library">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select name="genre" placeholder="Search by genre..."  onChange={(val) => filter(val)}>
        <option disabled selected value> -- select an option -- </option>
          {
            genre.map((op) => (
              <option value={op} key={op}>{op}</option>
            ))
          }
        </select>
        <button>Order Descending</button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {filterlist.map(movie => (
            <li key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul>
                <li>ID: {movie.id}</li>
                <li>Title: {movie.title}</li>
                <li>Year: {movie.year}</li>
                <li>Runtime: {movie.runtime}</li>
                <li>Genres: {movie.genres.join(', ')}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}