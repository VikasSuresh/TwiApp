import React,{ Component } from "react";
import { connect } from "react-redux";
import { getAllMovies } from '../../store/actions/MovieActions';
import * as selectors from "../../store/reducers/MovieReducer";
import Show from "../../components/Home/Show";
import HomeRender from '../../components/Home/Home';

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
        allMovies:selectors.getMovies(state),        
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        getAllMovies:()=>dispatch(getAllMovies()),        
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);