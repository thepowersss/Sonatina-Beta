import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {MusicScore} from '../../components/Music'
import {Button} from 'antd'
import { server } from '../../config';

const Score = ({ score }) => {
    const router = useRouter();

    const [newScore, setNewScore] = useState();
    const [newPitch, setNewPitch] = useState("A");
    const [newDuration, setNewDuration] = useState("1   ");
    const [newNote, setNewNote] = useState("A1   ");

    useEffect(() => {
        console.log("useEffect")
        setNewNote(newPitch+newDuration)
        insertNote
        insertBarline
        deleteNote
        //console.log(newNote)
    })

    const insertBarline = async (e) => {
        e.preventDefault();
        console.log("insertBarline pressed")
        // 1. GET current score
        try {
            console.log("attempt GET curr score")
            const res = await fetch(`${server}/api/scores/${router.query.id}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            });
            // set state
            console.log("finish GET curr score")
            const { data } = await res.json();
            newScore = {data}
            //console.log(newScore)
            //console.log(newScore.data.music)
        } catch (error) {
            console.log(error)
        }

        // 2. PUT new score updated
        try {
            console.log("attempt PUT curr score")
            newScore.data.music = newScore.data.music + "|"

            const res = await fetch(`${server}/api/scores/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newScore.data.music),
                //body: JSON.stringify(newScore),
            });

            console.log("finish PUT curr score")
            console.log(newScore.data.music)
            // console.log(res)

            //console.log(router)
            //router.reload(); // reload the page
        } catch (error) {
            console.log(error)
        }
    }

    const insertNote = async (e) => {
        e.preventDefault();
        console.log("updateScore button pressed")
        // setNewNote(newPitch+newDuration)
        console.log(newNote)

        // 1. GET current score
        try {
            console.log("attempt GET curr score")
            const res = await fetch(`${server}/api/scores/${router.query.id}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            });
            // set state
            console.log("finish GET curr score")
            const { data } = await res.json();
            newScore = {data}
            //console.log(newScore)
            //console.log(newScore.data.music)
        } catch (error) {
            console.log(error)
        }

        // 2. PUT new score updated
        try {
            console.log("attempt PUT curr score")
            newScore.data.music = newScore.data.music + newNote

            const res = await fetch(`${server}/api/scores/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newScore.data.music),
                //body: JSON.stringify(newScore),
            });

            console.log("finish PUT curr score")
            console.log(newScore.data.music)
            // console.log(res)

            //console.log(router)
            //router.reload(); // reload the page
        } catch (error) {
            console.log(error)
        }
    }

    const deleteNote = async (e) => {
        e.preventDefault();
        console.log("deleteNote pressed")

        // 1. GET current score
        try {
            console.log("attempt GET curr score")
            const res = await fetch(`${server}/api/scores/${router.query.id}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            });
            // set state
            console.log("finish GET curr score")
            const { data } = await res.json();
            newScore = {data}
            //console.log(newScore)
            //console.log(newScore.data.music)
        } catch (error) {
            console.log(error)
        }

        // 2. check if there's a barline in last 4 chars
        console.log("check is here:")
        console.log(newScore.data.music.slice(-5))

        if ((newScore.data.music.slice(-5).includes("|"))) {
            console.log ("contains barline")
            // TODO
            // delete up to the right of the barline
            // if barline is the last character, then delete just the barline
        } else {
            console.log("no barline")
            console.log(newScore.data.music.slice(0, -5))
            // delete last 4 characters
            // 3. PUT new score with deletion
            try {
                console.log("attempt PUT curr score")
                newScore.data.music = newScore.data.music.slice(0, -5)

                const res = await fetch(`${server}/api/scores/${router.query.id}`, {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newScore.data.music),
                    //body: JSON.stringify(newScore),
                });

                console.log("finish PUT curr score")
                console.log(newScore.data.music)
                // console.log(res)

                //console.log(router)
                //router.reload(); // reload the page
            } catch (error) {
                console.log(error)
            }
        }
    }

    function setPitch(pitch) {
        //console.log(pitch)
        setNewPitch(pitch)
        console.log(newPitch)
    }

    function setDuration(duration) {
        //console.log(duration)
        setNewDuration(duration)
        console.log(newDuration)
    }

    return (
        <div>
            <div className="input-container">mobile screen</div>
            <div className="pitch-container">
                <Button onClick={function(){setPitch("a")}}>a</Button>
                <Button onClick={function(){setPitch("g")}}>g</Button>
                <Button onClick={function(){setPitch("f")}}>f</Button>
                <Button onClick={function(){setPitch("e")}}>e</Button>
                <Button onClick={function(){setPitch("d")}}>d</Button>
                <Button onClick={function(){setPitch("c")}}>c</Button>
                <Button onClick={function(){setPitch("B")}}>B</Button>
                <Button onClick={function(){setPitch("A")}}>A</Button>
                <Button onClick={function(){setPitch("G")}}>G</Button>
                <Button onClick={function(){setPitch("F")}}>F</Button>
                <Button onClick={function(){setPitch("E")}}>E</Button>
                <Button onClick={function(){setPitch("D")}}>D</Button>
                <Button onClick={function(){setPitch("C")}}>C</Button>
            </div>
            <div className="duration-container">
                <Button type='dashed' onClick={function(){setDuration("12  ")}}>Dotted Whole</Button>
                <Button type='dashed' onClick={function(){setDuration("8   ")}}>Whole</Button>
                <Button type='dashed' onClick={function(){setDuration("6   ")}}>Dotted Half</Button>
                <Button type='dashed' onClick={function(){setDuration("4   ")}}>Half</Button>
                <Button type='dashed' onClick={function(){setDuration("3   ")}}>Dotted Quarter</Button>
                <Button type='dashed' onClick={function(){setDuration("2   ")}}>Quarter</Button>
                <Button type='dashed' onClick={function(){setDuration("3/2 ")}}>Dotted Eighth</Button>
                <Button type='dashed' onClick={function(){setDuration("1   ")}}>Eighth</Button>
                <Button type='dashed' onClick={function(){setDuration("3/4 ")}}>Dotted Sixteenth</Button>
                <Button type='dashed' onClick={function(){setDuration("/2  ")}}>Sixteenth</Button>
                <Button type='dashed' onClick={function(){setDuration("3/8 ")}}>Dotted Thirty-second</Button>
                <Button type='dashed' onClick={function(){setDuration("/4  ")}}>Thirty-second</Button>
            </div>
            <div>{newNote}</div>
            <Button type='dashed' onClick={insertNote}>Insert</Button>
            <Button type='dashed' onClick={deleteNote}>Delete</Button>
            <Button type='dashed' onClick={insertBarline}>Insert Barline</Button>

        </div>
    )
}

Score.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${server}/api/scores/${id}`);
    const { data } = await res.json();

    return { score: data }
}

export default Score;
