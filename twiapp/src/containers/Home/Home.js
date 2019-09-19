import React,{ Component } from "react";
import { connect } from "react-redux";
import { getAllMovies } from '../../store/actions/MovieActions';
import Show from "../../components/DisplayMovie";
import * as selectors from "../../store/reducers/MovieReducer";
import './Home.css';
class Home extends Component{
    state={
        allMovies:[],
        isFetched:false    
    }    
    componentDidMount(){                
       this.props.getAllMovies();               
    }   
    componentDidUpdate(prevProps){
        if(this.props!==prevProps){
            this.setState({
                isFetched:true
            })
        }
    }    
    
    render(){                                                 
        let allMovies=this.props.allMovies;       
        if(this.state.isFetched){                        
            allMovies=allMovies.map(movie=>(
            <Show movie={movie} key={movie._id}/>                          
            ));        
        }else{
            allMovies=<div>Loading</div>
        }
        
        return(
            <div className="container">
            <br />               
            <div className='row'>
                <div className="col-md-4"></div>
                <div className="col-md-4" id='addMovie'>
                    <form action="/addMovie">
                        <input type="submit" value="Add Movie" />
                    </form>
                </div>                
            </div>         
            <div className='row'>
                <div className="col-md-4"></div>
                <div className="jumbotron">
                    <div className="col-md-12" id='display'>
                        {allMovies}                                                
                    </div>
                </div>
            </div>
        </div>   
        )
    }
}

const mapStateToProps=state=>{
    return{        
        allMovies:selectors.getMovies(state),        
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        getAllMovies:()=>dispatch(getAllMovies()),        
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);