import fetch from 'isomorphic-unfetch';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {MusicScore} from '../../components'
import {Button} from 'antd'
import { server } from '../../config';
import Link from 'next/link';
import 'antd/dist/antd.css'

const Score = ({ score }) => {
    const router = useRouter();

    setTimeout(() => {console.log("reloading page...")}, 5000);
    setTimeout(() => {location.reload()}, 5000);

    return (
        <div className="score-container">
           <p>This page will refresh every 5 seconds.</p>

            <h1>{score.title}</h1>
            <h1>{score.composer}</h1>
            <p>{score.description}</p>
            <p>{score.music}</p>
            <MusicScore
                abc={score.header+"\n"+score.music}
            />

        <Button>
            <Link href={`${server}/${router.query.id}/mobile`}>Mobile Input</Link>
        </Button>
        <Button onClick={() => location.reload()}>reload page</Button>
        </div>
    )
}

Score.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${server}/api/scores/${id}`);
    const { data } = await res.json();

    return { score: data }
}

export default Score;
