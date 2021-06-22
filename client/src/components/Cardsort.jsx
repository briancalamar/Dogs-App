import Cards from "./Cards";
import Sorts from "./Sorts";
import './Style/Cardsort.css'

export default function Cardsort(){

    return(
        <div className="card-sort">
            <Sorts/>
            <Cards/>
        </div>
    )
}