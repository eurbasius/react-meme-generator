import { Component } from "react";

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: '',
            bottomText: '',
            randomImage: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: [],
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response => this.setState({
            allMemeImgs: response.data.memes
        }))

    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randomNumber = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const meme = this.state.allMemeImgs[randomNumber]
        this.setState({
            randomImage: meme.url
        })

    }

    render() {

        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="topText" value={this.state.topText} onChange={this.handleChange}/>
                    <input type="text" name="bottomText" value={this.state.bottomText} onChange={this.handleChange}/>
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;