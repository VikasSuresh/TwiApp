import React,{ Component } from "react";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import  * as selectors from "../../store/reducers/MovieReducer";
import { getAMovie } from "../../store/actions/MovieActions";
class Movie extends Component{
    state={
        isFetched:false
    }
    componentDidMount(){
        this.props.getMovie(this.props.id);
    }
    componentDidUpdate(prevProps){
        if(this.props!==prevProps){
            this.setState({
                isFetched:true
            })
        }
    }
    render(){
        let movie='Loading';           
        if(this.props.movie===""){
            return(                
                <div>
                    <div className='alert alert-danger'>Error in Data</div>
                    <a href='/'>Redirect to Home</a>
                </div>   
            )
        }
        else if (this.state.isFetched && this.props.movie!=='') {
            movie=this.props.movie;            
            return(<div>            
            <div><img src={movie.Poster} alt={movie.Name} height="100" width="100"/></div>
            <div>{movie.Name}</div>
            <div>{movie.YOR}</div>
            <div>{movie.Plot}</div>
            <div>{movie.Actors}</div>
            <form>     
                           
            </form>
            </div>
                )        
        }
        else{
            return(
            <div>
                <div>{movie}</div>
                <a href='/'>Redirect to Home</a>
            </div>                                
            )
        }
         
    }
}

const mapStateToProps=(state,{match:{params}})=>{    
    return{
        movie:selectors.getMovie(state),
        id:params.id
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
    getMovie:(id)=>dispatch(getAMovie(id)),    
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Movie));