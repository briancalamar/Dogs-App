import './App.css';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import DogDetail from './components/DogDetail';
import CreateDog from './components/CreateDog';
import Temperaments from './components/Temperaments';
import Cardsort from './components/Cardsort';


export default function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Welcome}/>
      <Route path="/:nav" component={NavBar}/>
      <Route exact path="/home" component={Cardsort}/>
      <Route exact path="/createdog" component={CreateDog}/>
      <Route exact path="/home/:name" component={DogDetail}/>
      <Route path="/temperaments" component={Temperaments}/>
    </div>
  );
}