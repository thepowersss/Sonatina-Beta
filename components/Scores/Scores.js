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
                {scores.map(score => {
                    return (
                        <Link href={score._id}>
                            <div key={score._id} className='clickable'>
                                <h3>score id: {score._id}</h3>
                                <h3>description: {score.description}</h3>

                                <MusicScore
                                    title={score.title}
                                    abc={score.music}
                                />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Scores
