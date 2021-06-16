import './App.css';
import { Route } from 'react-router-dom';
import Cards from './components/Cards';
import NavBar from './components/NavBar';
import  { connect } from "react-redux";
import Welcome from './components/Welcome';
import DogDetail from './components/DogDetail';


function App({showBar}) {
  return (
    <div className="App">
      {/* {
      showBar && <NavBar/>
      } */}
      <Route exact path="/" component={Welcome}/>
      <Route path="/:dogs" component={NavBar}/>
      <Route exact path="/dogs" component={Cards}/>
      <Route exact path="/dogs/:name" component={DogDetail}/>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    showBar: state.infoPage.showBar,
  }
}

export default connect(mapStateToProps)(App)

