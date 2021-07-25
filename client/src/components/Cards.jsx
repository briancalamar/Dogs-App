import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDogs, resetInfo, detailDog } from "../reducer/actions"
import CardDog from "./CardDog"
import './Style/Cards.css'
import loading from '../img/Loading.gif'
import notFound from '../img/notFound.jpg'

export default function Cards() {

    const dispatch = useDispatch()
    const dogs = useSelector( store => store.dogs)
    const infoPage = useSelector( store => store.infoPage)

    useEffect(() => {
        dispatch(getDogs(infoPage))
    }, [infoPage, dispatch])

    function handleClick(id) {
        dispatch(resetInfo())

        if (typeof id === "number") dispatch(detailDog(id))
    }

    return (
        <div className="cards">
            {
                dogs === null 
                ? <img src={loading} alt="cargando" /> 
                : dogs.length === 0

                    ? <Link
                            to="/home"
                            onClick={handleClick}
                            className="cards-link">
                            <CardDog
                                id="404"
                                name="Dog Not Found"
                                temperaments={[]}
                                image={notFound}
                            />
                        </Link>
                         
                    : dogs.map(e =>
                            <Link
                                to={`/home/${e.name}`}
                                onClick={() => handleClick(e.id)}
                                key={e.id}
                                className="cards-link">
                                <CardDog
                                    id={e.id}
                                    name={e.name}
                                    temperaments={e.temperaments}
                                    image={e.image}
                                />
                            </Link>
                        )
            }
        </div>
    )
}