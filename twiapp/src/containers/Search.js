import React,{Component} from 'react';
import { connect } from "react-redux";
import {getMBON} from "../store/reducers/MovieReducer";
import {getMoviesBasedOnName} from "../store/actions/MovieActions";
import Show from "../components/Home/Show";
import HomeRender from "../components/Home/Home";

class Search extends Component{
    state={
        isFetched:false
    }
    componentDidMount(){
        let params=(new URL(document.location)).searchParams;        
        this.props.getMoviesBasedOnName(params.get('Movie'))
    }
    componentDidUpdate(prevProps){
        if(prevProps!==this.props){
            this.setState({
                isFetched:true
            })
        }        
    }
    render(){
        let allMovies=this.props.movies;       
        if(this.state.isFetched){                        
            allMovies=allMovies.map(movie=>(
            <Show movie={movie} key={movie._id}/>                          
            ));                
            return(        
                <HomeRender allMovies={allMovies}/>
                )
        }else{
            allMovies=<div>Loading</div>
            return(<div>{allMovies}</div>)
        }
    }
}
const mapStateToProps=state=>{
    return{
        movies:getMBON(state)
    }
}

const mapStateToDispatch=(dispatch)=>{
    return{
        getMoviesBasedOnName:(Name)=>dispatch(getMoviesBasedOnName(Name))
    }
}

export default connect(mapStateToProps,mapStateToDispatch)(Search);