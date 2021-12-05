import fetch from 'isomorphic-unfetch';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {MusicScore} from '../../components/Music'
import {Button} from 'antd'

const Score = ({ score }) => {
    const [form, setForm] = useState({
        title: score.title,
        composer: score.composer,
        description: score.description,
        music: score.music
    });
    const router = useRouter();

    const updateScore = async (e) => {
        console.log("updateScore button pressed")
        e.preventDefault();
        const testScore = `
        %abc-2.2
        %%pagewidth 14cm
        %%bgcolor white
        %%topspace 0
        %%composerspace 0
        %%leftmargin 0.8cm
        %%rightmargin 0.8cm
        %%fullsvg 2

        X:1
        T:J'ai du bon tabac
        C:Trad.
        M:2/4
        L:1/8
        Q:1/4=120
        K:C
        CDEC|D2DE|F2F2|E2E2|CDEC|D2DE|F2G2|C4:|
        G2GF|E2DE|F2G2|F2E2|G2GF|E2DE|F2G2|D4|
        CDEC|D2DE|F2F2|E2E2|CDEC|D2DE|F2G2|C4||
        `
        // const scoreId = router.query.id;
        try {
            const res = await fetch(`http://localhost:3000/api/scores/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(testScore),
            });
            // set state
            console.log("put fetch updateScore")
            console.log(router)
            // reload the page
            //router.push("/mobiletest");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="note-container">
            <h1>{score.title}</h1>
            <h1>{score.composer}</h1>
            <p>{score.description}</p>
            <p>{score.music}</p>
            <MusicScore
                abc={score.music}
            />
            <Button type='submit' onClick={updateScore}>UpdateMusic</Button>
        </div>
    )
}

Score.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/scores/${id}`);
    const { data } = await res.json();

    return { score: data }
}

export default Score;
