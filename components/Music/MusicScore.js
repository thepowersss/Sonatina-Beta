import {Component} from 'react'
import Abc2Svg from 'react-abc2svg'


class MusicScore extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <h1>{this.props.title}</h1>
            <Abc2Svg
                abcNotation={this.props.abc}
                showErrors
            />
        </div>
    }
}

export default MusicScore
