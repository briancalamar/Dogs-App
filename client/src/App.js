import './App.css';
import { Route } from 'react-router-dom';
import Cards from './components/Cards';


function App(props) {
  return (
    <div className="App">
      <Route path="/" component={Cards}/>
    </div>
  );
}

export default App

// useEffect( () => {
//   props.getDogs();
// }, [props.getDogs])

// console.log(props.dogs)
// console.log(props)

// function mapStateToProps(state) {
//   return {
//     dogs: state.dogs,
//     temperaments: state.temperaments
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getDogs: () => { dispatch(getDogs())}
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
