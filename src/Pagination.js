import React from 'react'

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
    return (
        //the first bits of these lines of codes check to see if there is a previous/next page to go to
        <div>
            {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>} 
            {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
        </div>
    )
}
