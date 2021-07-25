import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetInfo, getTemperaments, getDogsFilter, detailDog } from "../reducer/actions";
import CardDog from './CardDog';
import CardTemperament from './CardTemperament';
import './Style/Temperaments.css'
import loading from '../img/Loading.gif'
import notFound from '../img/notFound.jpg'

export default function Temperaments() {

    const temperaments = useSelector( store => store.temperaments);
    const dogsFilter = useSelector( store => store.dogsFilter);
    const [temp, setTemp] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetInfo());
        dispatch(getTemperaments());
    }, [dispatch])

    async function handleClick(nameId) {
        if (typeof nameId !== "number") {
            setTemp(nameId);
            await dispatch(getDogsFilter({ filterTemperaments: nameId }));
        }
        dispatch(detailDog(nameId));
    }

    return (
        <div className="temperaments">
            {
                dogsFilter === null
                    ? temperaments === null ? <img src={loading} alt="cargando" /> : temperaments.length === 0

                        ? <Link to="/home" onClick={handleClick}>
                            <img src={notFound} alt="cargando" />
                        </Link> : temperaments.map(e =>
                            <Link
                                className="temp-l"
                                to={`/temperaments/${e.name}`}
                                onClick={() => handleClick(e.name)}
                                key={e.id}>
                                <CardTemperament
                                    temperament={e.name}
                                />
                            </Link>
                        ) 
                        
                        : dogsFilter.filter(e => e.temperaments?.includes(temp)).map(e =>
                        <Link
                            className="temp-l"
                            to={`/home/${e.name}`}
                            onClick={() => handleClick(e.id)}
                            key={e.id}>
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
