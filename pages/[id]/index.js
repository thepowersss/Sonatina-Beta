import fetch from 'isomorphic-unfetch';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {MusicScore} from '../../components/Music'
import {Button} from 'antd'
import { server } from '../../config';
import Link from 'next/link';

const Score = ({ score }) => {
    const router = useRouter();
    const [testScore, setForm] = useState();
//     const [testScore, setForm] = useState({
//         title: 'rrr',
//         description: 'rr',
//         composer: 'r',
//         music: `%abc-2.2
// %%pagewidth 14cm
// %%bgcolor white
// %%topspace 0
// %%composerspace 0
// %%leftmargin 0.8cm
// %%rightmargin 0.8cm
// %%fullsvg 2
//
// X:1
// T:J'ai du bon tabac
// C:Trad.
// M:2/4
// L:1/8
// Q:1/4=120
// K:C
// CDEC|D2DE|F2F2|E2E2|CDEC|D2DE|F2G2|C4:|
// G2GF|E2DE|F2G2|F2E2|G2GF|E2DE|F2G2|D4|
// CDEC|D2DE|F2F2|E2E2|CDEC|D2DE|F2G2|C4||`});

    const updateScore = async (e) => {
        console.log("updateScore button pressed")
        e.preventDefault();
        // const scoreId = router.query.id;

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
            testScore = {data}
            //console.log(testScore)
            //console.log(testScore.data.music)
        } catch (error) {
            console.log(error)
        }

        // 2. PUT new score updated
        try {
            console.log("attempt PUT curr score")
            var newScore = testScore.data.music + "C"
            testScore.data.music = newScore;

            const res = await fetch(`${server}/api/scores/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newScore),
                //body: JSON.stringify(testScore),
            });

            console.log("finish PUT curr score")
            console.log(testScore.data.music)
            console.log(res)

            //console.log(router)
            //router.reload(); // reload the page
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="score-container">
            <h1>{score.title}</h1>
            <h1>{score.composer}</h1>
            <p>{score.description}</p>
            <p>{score.music}</p>
            <MusicScore
                abc={score.music}
            />

        <Button>
            <Link href={`${server}/${router.query.id}/mobile`}>Mobile Input</Link>
        </Button>
        </div>
    )
}

Score.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${server}/api/scores/${id}`);
    const { data } = await res.json();

    return { score: data }
}

export default Score;
