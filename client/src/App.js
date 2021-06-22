import './App.css';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import DogDetail from './components/DogDetail';
import CreateDog from './components/CreateDog';
import Temperaments from './components/Temperaments';
import Cardsort from './components/Cardsort';


export default function App({showBar}) {
  return (
    <div className="App">
      {/* {
      showBar && <NavBar/>
      } */}
      <Route exact path="/" component={Welcome}/>
      <Route path="/:homecreate" component={NavBar}/>
      {/* <Route path="/home" component={Sorts}/>
      <Route exact path="/home" component={Cards}/> */}
      <Route exact path="/home" component={Cardsort}/>
      <Route exact path="/createdog" component={CreateDog}/>
      <Route exact path="/home/:name" component={DogDetail}/>
      <Route path="/temperaments" component={Temperaments}/>
    </div>
  );
}

// function mapStateToProps(state) {
//   return {
//     showBar: state.infoPage.showBar,
//   }
// }

// export default connect(mapStateToProps)(App)

