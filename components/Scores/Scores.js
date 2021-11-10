import Link from 'next/link';
import React from 'react'
import fetch from 'isomorphic-unfetch';
import {MusicScore} from '../Music'

function Scores(props) {
    let scores = props.scorekey
    console.log("Scores.js component")
    console.log(scores)
    
    return (
        <div className="notes-container">
            <h1>Scores</h1>
            <div className="grid wrapper">
                {scores.map(note => {
                    return (
                        <div key={note._id}>
                            {note._id}
                            {' \n '}
                            {note.description}
                            <MusicScore
                                title={note.title}
                                abc={note.music}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Scores
