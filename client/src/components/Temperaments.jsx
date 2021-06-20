import CardTemperament from './CardTemperament';
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { infoPage, resetInfo, getTemperaments, getDogsFilter, detailDog } from "../reducer/actions";
import { Link } from "react-router-dom";
import CardDog from './CardDog';

function Temperaments({ getTemperaments, resetInfo, Stemp, getDogsFilter, dogsFilter, detailDog }) {

    const [temp, setTemp] = useState("")

    useEffect(() => {
        resetInfo()
        getTemperaments();
    }, [])

    async function handleClick(nameId) {
        if(typeof nameId !== "number"){
            setTemp(nameId)
            await getDogsFilter({ filterTemperaments: nameId })
        }
        detailDog(nameId)
    }

    return (
        <div className="temperaments">
            {
                dogsFilter === null ? Stemp === null ? <h1>Cargando</h1> : Stemp.length === 0 ?

                    <h1>Error</h1> : Stemp.map(e =>
                        <Link
                            to={`/temperaments/${e.name}`}
                            onClick={() => handleClick(e.name)}
                            key={e.id}>
                            <CardTemperament
                                temperament={e.name}
                            />
                        </Link>
                    ) :
                    dogsFilter.filter(e => e.temperaments?.includes(temp)).map(e =>
                        <Link
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

function mapStateToProps(state) {
    return {
        Stemp: state.temperaments,
        dogsFilter: state.dogsFilter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        infoPage: (ft) => dispatch(infoPage(ft)),
        resetInfo: () => dispatch(resetInfo()),
        getTemperaments: () => dispatch(getTemperaments()),
        getDogsFilter: (temp) => dispatch(getDogsFilter(temp)),
        detailDog: (id) => dispatch(detailDog(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Temperaments)