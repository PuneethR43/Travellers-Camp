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
        // console.log("comments form",this.props.data)
        return (
             <div className="md-form amber-textarea active-amber-textarea">
                <i className="fas fa-pencil-alt prefix"></i>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="form22"/>
                    <textarea 
                        id="form22" 
                        className="md-textarea form-control" 
                        rows="3" 
                        value={this.state.body} 
                        onChange={this.handleChange} 
                        name="body"
                        placeholder="Add Comments..."
                    />
                    <input type="submit" className="btn btn-primary" value="Add" />
                </form>
            </div>
        )
    }
}

export default connect()(CommentsForm)