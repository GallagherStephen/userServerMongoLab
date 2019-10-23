import React from 'react'
import Movies from './movies';
import axios from 'axios'; //imported for axios

class Read extends React.Component{

    state = {
        movies: []
    };

    componentDidMount() {
        axios.get('http://localhost:4000/api/movies') //the servers url which gets the movies api data . not allowed to work untill install cors in server.js
        .then((response)=> {
            this.setState({movies:response.data.movies}) //must be .movies as api movies will get u back the movies section of the api
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    
    render(){
        return(
            <div>
                <h1>Hello from Read Component</h1>
                <Movies myMovies={this.state.movies}></Movies>
            </div>
        );
    }
}
export default Read;