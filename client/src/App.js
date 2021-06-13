import './App.css';
// import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { getAllDogs } from './reducer/actions';


function App(props) {

  useEffect( () => {
    props.getAllDogs();
  }, [props.getAllDogs])

  console.log(props.dogs)
  console.log(props)

  return (
    <div className="App">
      <h1>Henry Dogs</h1>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    dogs: state.dogs,
    temperaments: state.temperaments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllDogs: () => { dispatch(getAllDogs())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
