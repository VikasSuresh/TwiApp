import React from 'react';
import './AddMovie.css'
const AddMovie=(props)=>(        
    <div className='container'>
        <div className='row'>
            <div className='col-sm-4'>
                <div id="demo" className="carousel slide" data-ride="carousel">
                    <ul className="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0" className="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                    </ul>
                    
                    <div className='carousel-inner'>
                        <div className='carousel-item active'>
                            <img src='/img/Carousel-1.jpeg' alt='img'  height='25%' />
                        </div>
                        <div className='carousel-item'>
                            <img src='/img/Carousel-2.jpg' alt='img'  height='25%' />
                        </div>
                        <div className='carousel-item'>
                            <img src='/img/Carousel-3.jpg' alt='img' height='25%' />
                        </div>
                    </div>

                    <a className='carousel-control-prev' href="#demo" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>

                    <a className='carousel-control-next' href="#demo" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
            </div>

            <div className='col-sm-6 MovieForm'>
            <form action='/' onSubmit={props.submit}>
                <div className="form-row">
                    <div className='col'>
                        <div>
                            <input type='text' name='Name' id='nameInput' className='form-control'placeholder="Name" />                        
                        </div>
                    </div>                                                                                    
                </div>     
                <div>
                    <input type='date' name='YOR' id='dateInput' className='form-control' placeholder="Date"/>                    
                </div>           
                <div>
                    <textarea name='Plot' id='plotTextArea' className='form-control' placeholder='Plot' />                    
                </div>      
                <div>
                    <input type='file' name='Poster' id='uploadInput' className='form-control'  />
                    <label></label>    
                </div>                      
                <label>Actors</label>
                <select multiple={true} onChange={props.handleChange} name='Actors' className="browser-default custom-select mb-4">
                    <option disabled>Choose Actors</option>                   
                    {props.val.actors.map((a,i)=>(
                        <option key={i} value={a._id}>{a.Name}</option>
                    ))}
                </select>
                <label>Producers</label>
                <select className="browser-default custom-select mb-4" name='Producers' defaultValue={'Default'} >
                    <option value='Default' disabled={true}>Choose Producers</option>
                    {props.val.producers.map((p,i)=>(
                        <option key={i} value={p._id}>{p.Name}</option>
                    ))}
                </select>
                <div>
                    <button className="btn btn-info btn-lg" type="submit">Send</button>
                </div>
            </form>
            </div>

        </div>          
    </div>
    
);

export default AddMovie;