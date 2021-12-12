import { Component } from 'react'
import { MusicScore } from '../components/Music'
import fetch from 'isomorphic-unfetch';
import { Button } from 'antd'
import { withRouter } from 'next/router'
import { server } from '../config';

export default withRouter(class ScorePage extends Component {
    static async getInitialProps(ctx) {
        const res = await fetch(`${server}/api/scores`);
        const { data } = await res.json();
        // var { query: { id } } = ctx;
        // console.log("fetch query")
        // console.log({ query: { id } })
        return { scores: data }
    }

	render() {
		return <div>
            <div>Mobile score website</div>
                <MusicScore
                    abc = {`
%abc-2.2
%%pagewidth 14cm
%%bgcolor white
%%topspace 0
%%leftmargin 0.8cm
%%rightmargin 0.8cm
%%fullsvg 1

X:1
T:Major scale in D
K:D
DEFG ABcd|
                `}
                />

                <MusicScore
                abc={`
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
                `}
            />
            <Button type='submit' onClick={this._updateMusic}>UpdateMusic</Button>
        </div>
	}
})
