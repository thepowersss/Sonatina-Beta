import Link from 'next/link';
import React from 'react'
import fetch from 'isomorphic-unfetch';
import MusicScore from '../Music'

// function Scores(props) {
//     return <div> reached </div>
// }



const Scores = ({ scores }) => {
    console.log({scores})
    console.log("reached")
    return (
        <div className="notes-container">
            <h1>Scores</h1>
            <div className="grid wrapper">
                {scores.map(note => {
                    return (
                        <div key={note._id}>
                            {note._id}
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

Scores.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/scores');
    const { data } = await res.json();

    console.log("fetch this")
    console.log(data)

    return { scores: data }
}
export default Scores
