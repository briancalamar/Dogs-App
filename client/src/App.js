import './App.css';
import { Route } from 'react-router-dom';
import Cards from './components/Cards';
import NavBar from './components/NavBar';
import  { connect } from "react-redux";
import Welcome from './components/Welcome';


function App({showBar}) {
  return (
    <div className="App">
      {/* {
      showBar && <NavBar/>
      } */}
      <Route exact path="/" component={Welcome}/>
      <Route path="/:dogs" component={NavBar}/>
      <Route exact path="/dogs" component={Cards}/>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    showBar: state.infoPage.showBar,
  }
}

export default connect(mapStateToProps)(App)

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
