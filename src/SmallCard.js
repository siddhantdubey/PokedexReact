//this component will contain the pokemon info when they are not expanded
import React, { useState, useEffect } from "react";
import axios from 'axios';
import './SmallCard.css'

export default function SmallCard( { name, infoURL } ) {
    const [imgURL, setImgURL]  = useState("")

    axios.get(infoURL).then(res => setImgURL(res.data.sprites.back_default))

    return (
        <div>
            <div class='smallcard'>
                <h4 id='name'>{name}</h4>
                <img id='image' src={imgURL}/>
            </div>
        </div>
    )
}
