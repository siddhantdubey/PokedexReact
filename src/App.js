import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from 'axios';
import './App.css'


function App() {

  /*
  We want the user to be able to:
  - Pick the number of pokemon per page (we will do this by changing the offset number we pass through initially
  - Sort pokemon by type (we can do this by directly altering the API call)
  */

  const queryNum = 20
  const numRows = queryNum/5
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState()
  

  let types = {
    'Normal': 1, 
    'Fighting': 2,
    'Flying': 3,
    'Poison': 4,
    'Ground': 5,
    'Rock': 6,
    'Bug': 7,
    'Ghost': 8,
    'Steel': 9,
    'Fire': 10,
    'Water': 11,
    'Grass': 12,
    'Electric': 13,
    'Psychic': 14,
    'Ice': 15,
    'Dragon': 16,
    'Dark': 17,
    'Fairy': 18,
    'unknown': 10001,
    'shadow': 10002
  };
  
  

  // setCurrentPageUrl(url)

  useEffect(() => {
    setLoading(true)
    let cancel 
    let url
    
      // url = ("https://pokeapi.co/api/v2/pokemon/")
      // setCurrentPageUrl(url)
      axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c) //this is so we can cancel old requests if the user spams the refresh button
      }).then(res => {
        setLoading(false)
        console.log(res.data.results)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p))
      })
    
    // else{
    //   url = "https://pokeapi.co/api/v2/type/" + types[type]
    //   setCurrentPageUrl(url)
    //   axios.get(currentPageUrl, {
    //     cancelToken: new axios.CancelToken(c => cancel = c) //this is so we can cancel old requests if the user spams the refresh button
    //   }).then(res => {
    //     console.log(res.data.pokemon)
    //     setLoading(false)
    //     // setNextPageUrl(res.data.next)
    //     // setPrevPageUrl(res.data.previous)
    //     setPokemon(res.data.pokemon.map(p => p.poggies))
    //   })
    // }
    

    return () => cancel() 
    
  }, [currentPageUrl, type])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if(loading) return "Loading data ..."
  


  var renderedOutput = Array(numRows).fill().map((x,i)=>i).map(
    (x) => <PokemonList pokemon={pokemon.slice(x*5, (x+1)*5)}/>
  ) //this bit of code adjusts the number of rows based on the number of pokemon queried

  return (
    <>
      <div>
        {renderedOutput}
      </div>
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
