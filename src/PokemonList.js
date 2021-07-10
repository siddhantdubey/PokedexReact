import React from 'react'
import SmallCard from './SmallCard'
import './PokemonList.css'


export default function PokemonList({ pokemon }) {
    return (
        <div class='grid-container'>
            {pokemon.map(p => (
                <div key={p.name} class='grid-item'>
                    <SmallCard name={p.name} infoURL={p.url}/>
                </div>
            ))}
        </div>
    )
}
