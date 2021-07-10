import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from 'axios';
import './App.css'
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

function closestMultipleOfFive(x){
  return (x + (5-x%5))
}

function App() {

  /*
  We want the user to be able to:
  - Pick the number of pokemon per page (we will do this by changing the offset number we pass through initially
  - Sort pokemon by type (we can do this by directly altering the API call)
  */

  const [queryNum, setQueryNum] = useState(20)
  const numRows = queryNum/5
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState()
  
  const actions = [
    { label: "All", value: "All"},
    { label: "Normal", value: "Normal" },
    { label: "Fighting", value: "Fighting" },
    { label: "Flying", value: "Flying" },
    { label: "Poison", value: "Poison" },
    { label: "Ground", value: "Ground" },
    { label: "Rock", value: "Rock" },
    { label: "Bug", value: "Bug" },
    { label: "Ghost", value:  "Ghost"},
    { label: "Steel", value: "Steel" },
    { label: "Fire", value: "Fire" },
    { label: "Water", value: "Water" },
    { label: "Grass", value: "Grass" },
    { label: "Electric", value: "Electric" },
    { label: "Psychic", value: "Psychic" },
    { label: "Ice", value: "Ice" },
    { label: "Dragon", value: "Dragon" },
    { label: "Dark", value: "Dark" },
    { label: "Fairy", value: "Fairy"},
    { label: "unknown", value: "unknown" },
    { label: "Shadow", value: "Shadow" },
  ];


  let types = {
    'All': undefined,
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
  

  useEffect(() => {
    setLoading(true)
    let cancel 
    let url
    setQueryNum(20)
    if(type === undefined || type === 'All'){
      if(!(currentPageUrl.includes("https://pokeapi.co/api/v2/pokemon/"))){
        url = "https://pokeapi.co/api/v2/pokemon/"
        setCurrentPageUrl(url)
      }
      axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c) //this is so we can cancel old requests if the user spams the refresh button
      }).then(res => {
        setLoading(false)
        console.log(res.data)
        setNextPageUrl(res.data.next)
        console.log("Next page url: " + nextPageUrl)
        setPrevPageUrl(res.data.previous)
        console.log("Previous Page Url: " + prevPageUrl)
        setPokemon(res.data.results.map(p => p))
      })
    }
    else{
      url = "https://pokeapi.co/api/v2/type/" + types[type]
      setCurrentPageUrl(url)
      axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c) //this is so we can cancel old requests if the user spams the refresh button
      }).then(res => {
        console.log(res.data.pokemon)
        setLoading(false)
        setQueryNum(closestMultipleOfFive(res.data.pokemon.length))
        setPokemon(res.data.pokemon.map(p => p.pokemon))
      })
    }
    
    return () => cancel() 
    
  }, [currentPageUrl, type])

  function gotoNextPage() {
    console.log("function called")
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
      <Select options={ actions } placeholder="Select Pokemon Type" onChange={ (event) => {setType(event.value); setNextPageUrl(nextPageUrl); setPrevPageUrl(prevPageUrl)} }/>
      <h1>{ type } type Pokemon</h1>
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
