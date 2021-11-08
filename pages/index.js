import {Component} from 'react'
import {MusicScore} from '../components/Music'

class ScorePage extends Component {

	render() {
		return <div>
            <div>Main score website</div>
            <MusicScore
                title={'score 1'}
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
            `}/>
            <MusicScore
                title={'score 2'}
                abc={`
%abc-2.2
%%pagewidth 14cm
%%bgcolor beige
%%topspace 0
%%composerspace 0
%%leftmargin 0.8cm
%%rightmargin 0.8cm
%%fullsvg 1

X:1
T:Example
M:4/4
C:Trad.
K:G
|:Gccc dedB|dedB dedB|
c2ec B2dB|c2A2 A2BA|
            `}/>
        </div>
	}
}

export default ScorePage
