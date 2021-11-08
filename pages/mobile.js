// import {Component, useState} from 'react'
// import {MusicScore} from '../components/Music'
// //import Button from '../elements/Button'
// import {Button} from 'antd'
// import clientPromise from '../lib/mongodb';
// import 'antd/dist/antd.css';
// import { useRouter } from 'next/router';
//
// class Mobile extends Component {
//     constructor(props) {
// 		super(props)
//
//
// 		// this.state = {
//         //
// 		// }
// 	}
//
//     _putData = () => {
//         //const router = useRouter();
//         const test_score = `
//         %abc-2.2
//         %%pagewidth 14cm
//         %%bgcolor white
//         %%topspace 0
//         %%composerspace 0
//         %%leftmargin 0.8cm
//         %%rightmargin 0.8cm
//         %%fullsvg 2
//
//         X:1
//         T:J'ai du bon tabac
//         C:Trad.
//         M:2/4
//         L:1/8
//         Q:1/4=120
//         K:C
//         CDEC|D2DE|F2F2|E2E2|CDEC|D2DE|F2G2|C4:|
//         G2GF|E2DE|F2G2|F2E2|G2GF|E2DE|F2G2|D4|
//         CDEC|D2DE|F2F2|E2E2|CDEC|D2DE|F2G2|C4||C4
//         `
//         try {
//             // Update post
//             fetch('/api/musicScore', {
//                 method: 'PUT',
//                 headers: {
//                     Accept: contentType,
//                     'Content-Type': contentType,
//                 },
//                 body: JSON.stringify(test_score),
//             });
//             // set state
//
//             // reload the page
//             //return router.push(router.asPath);
//         } catch (error) {
//             console.log("putData error")
//         }
//     }
//
//     componentDidMount() {
//
//     }
//
//     _add_C4 = (e) => {
//         console.log("_add_C4 pressed")
//         e.preventDefault()
//         _putData()
//     }
//
//     _add_note = () => {
//         console.log("_add_note pressed")
//
//     }
//
// 	render() {
// 		return <div>
//             <div> This is the mobile interface</div>
//             <Button type='primary' onClick={this._add_C4}> Add C4 </Button>
//             <Button type='secondary' onClick={this._add_note}> Add Note </Button>
//         </div>
// 	}
// }
//
// export default Mobile
