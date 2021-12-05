import {Component} from 'react'
import {MusicScore} from '../components/Music'
import {Scores} from '../components/Scores'
import fetch from 'isomorphic-unfetch';
import {Button} from 'antd'
import { withRouter } from 'next/router'


export default withRouter(class ScorePage extends Component {
    // static async getInitialProps({ query: { id } }) {
    //     const res = await fetch('http://localhost:3000/api/scores/${id}');
    //     const { data } = await res.json();
    //
    //     console.log(data)
    //     console.log("fetch this")
    //     console.log({scores:data})
    //     return { scores: data }
    // }
    static async getInitialProps(ctx) {
        const res = await fetch('http://localhost:3000/api/scores');
        const { data } = await res.json();

        console.log(data)
        console.log("fetch this")
        console.log({scores:data})
        // var { query: { id } } = ctx;
        // console.log("fetch query")
        // console.log({ query: { id } })
        return { scores: data }
    }

    _updateMusic = async (e) => {
        console.log("_updateMusic button pressed")
        e.preventDefault();
        try {
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
            //const res = await fetch('http://localhost:3000/api/scores/${router.query.id}', {
            const res = await fetch('http://localhost:3000/api/scores/${this.props.router.query.id}', {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(testScore),
            });
            // set state
            console.log("put fetch updateMusic")
            console.log(this.props.router)
            // reload the page
            //this.props.router.push("/mobiletest");
        } catch (error) {
            console.log("updateMusic error")
            console.log(error)
        }
    }

	render() {
		return <div>
            <div>Mobile score website</div>

            <Scores
                scorekey={this.props.scores}
            />
            <Button type='submit' onClick={this._updateMusic}>UpdateMusic</Button>
        </div>
	}
})
