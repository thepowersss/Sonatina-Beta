import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {MusicScore} from '../../components'
import {Button} from 'antd'
import 'antd/dist/antd.css'
import { server } from '../../config';
import Link from 'next/link';

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

        // 2a. check if there are notes to delete



        // 2b. check if there's a barline in last 4 chars
        console.log("check is here:")
        let viewSlice = newScore.data.music.slice(-5)
        console.log(viewSlice)

        if ((viewSlice.includes("|"))) {
            console.log ("contains barline")
            // delete up to the right of the barline
            for (let i = 4; i > -1; i--) {
                console.log(i)
                if (viewSlice.charAt(i)=='|') {
                    // delete up to the right of the barline
                    console.log("detected at " + i)
                    console.log(newScore.data.music.slice(0, -i))
                    newScore.data.music = newScore.data.music.slice(0, -i)

                    // PUT newScore
                    try {
                        console.log("attempt PUT curr score")

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
                    break
                }
            }
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
        <div className="wrapper">
            <div className="centered">Mobile Input</div>
            <div className="input-container">
                <div className="centered">
                <MusicScore
                    abc={`%abc-2.2
%%pagewidth 14cm
%%bgcolor white
%%topspace 0
%%composerspace 0
%%leftmargin 0.8cm
%%rightmargin 0.8cm
%%fullsvg 2

X:1
L:1/8
K:C
${newNote}`}
                />
                </div>
                <div>{newNote}</div>
                <div className="pitch-container">Pitch
                    <Button onClick={function(){setPitch("a")}}>A5</Button>
                    <Button onClick={function(){setPitch("g")}}>G5</Button>
                    <Button onClick={function(){setPitch("f")}}>F5</Button>
                    <Button onClick={function(){setPitch("e")}}>E5</Button>
                    <Button onClick={function(){setPitch("d")}}>D5</Button>
                    <Button onClick={function(){setPitch("c")}}>C5</Button>
                    <Button onClick={function(){setPitch("B")}}>B4</Button>
                    <Button onClick={function(){setPitch("A")}}>A4</Button>
                    <Button onClick={function(){setPitch("G")}}>G4</Button>
                    <Button onClick={function(){setPitch("F")}}>F4</Button>
                    <Button onClick={function(){setPitch("E")}}>E4</Button>
                    <Button onClick={function(){setPitch("D")}}>D4</Button>
                    <Button onClick={function(){setPitch("C")}}>C4</Button>
                </div>
                <div className="duration-container">Duration
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
            </div>
            <div className="buttons">
                <Button type='primary' onClick={insertNote}>Insert</Button>
                <Button type='primary' onClick={deleteNote}>Delete</Button>
                <Button type='primary' onClick={insertBarline}>Insert Barline</Button>
                <Button>
                    <Link href={`${server}/${router.query.id}`}>Go to Score</Link>
                </Button>
            </div>
        </div>
    )
}

Score.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${server}/api/scores/${id}`);
    const { data } = await res.json();

    return { score: data }
}

export default Score;
