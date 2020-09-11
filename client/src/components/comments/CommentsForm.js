import React from 'react' 
import { connect } from 'react-redux'

import { startCreateComment } from '../../actions/postsAction'

class CommentsForm extends React.Component {
    constructor(){
        super()
        this.state = {
            body : ''
        }
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            body: this.state.body
        }
        this.props.dispatch(startCreateComment(this.props.data, formData))
        this.state.body = ''
        
    }

    render(){
        console.log("comments form",this.props.data)
        return (
            <div>
                <h2>Add Comment</h2>
                <form onSubmit={this.handleSubmit}>
                    <textarea value={this.state.body} onChange={this.handleChange} name="body"></textarea><br/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default connect()(CommentsForm)