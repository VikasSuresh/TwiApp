import React from 'react';
const MovieModal =(param)=>(
    <div className="modal fade" id="MovieModal" tabIndex="-1" role="dialog" aria-labelledby="MovieModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="MovieModalLabel">Movie</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">                    
                    <div>
                        <input onChange={param.fileHandle} type='file' name='Poster' id='img' className='form-control' />                        
                        <input type='hidden' id='Poster-url' value=''/>
                    </div>  
                    <div>
                        <input type='text' name='Name' id='Name' className='form-control' placeholder="Name" defaultValue={param.state.movie.Name} />                        
                    </div>                                                                     
                    <div>
                        <input type='date' name='YOR' id='YOR' className='form-control' placeholder="Date" defaultValue={param.state.movie.YOR.slice(0,10)}/>                    
                    </div>           
                    <div>
                        <textarea name='Plot' id='Plot' className='form-control' placeholder='Plot' defaultValue={param.state.movie.Plot} />                    
                    </div>                                              
                    <label>Actors</label>
                    <select multiple={true} name='Actors' id='actors' 
                    className="browser-default custom-select mb-4" defaultValue={param.state.actors.map(m=>m._id)} >
                         {param.props.actors.map(m=>(
                            <option key={m._id} value={m._id}  >{m.Name}</option>                    
                        ))}
                    </select>
                    <label>Producers</label>
                    <select className="browser-default custom-select mb-4" id='producers' name='Producers' 
                     defaultValue={param.state.producers.map(m=>m._id)[0]}>                        
                        {param.props.producers.map(m=>(                
                            <option key ={m._id} value={m._id} >{m.Name}</option>                
                        ))}
                    </select>
                </div>            
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id='save' value={param.state.movie._id} onClick={param.save} className="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>    
    </div>
)
export default MovieModal;