import React from 'react';
import Card from 'react-bootstrap/Card';
class MovieItem extends React.Component{

    render(){
        return(
            <div>
                {/* <h4>{this.props.movie.Title}</h4>
                <p>{this.props.movie.Year}</p>
                <img src={this.props.movie.Poster}></img> */}


                <Card  border="primary" style={{ width: '28rem' }}>

  <Card.Header>{this.props.movie.title}</Card.Header>
  <Card.Body>
    <blockquote className="blockquote mb-0">
    <img src={this.props.movie.poster}></img>
      <footer>
      {this.props.movie.year}                     
      </footer>
    </blockquote>
  </Card.Body>
</Card>
            </div>
        )
    }
}
export default MovieItem;