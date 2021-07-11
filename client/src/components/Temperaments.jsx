import CardTemperament from './CardTemperament';
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { infoPage, resetInfo, getTemperaments, getDogsFilter, detailDog } from "../reducer/actions";
import { Link } from "react-router-dom";
import CardDog from './CardDog';
import './Style/Temperaments.css'

function Temperaments({ getTemperaments, resetInfo, Stemp, getDogsFilter, dogsFilter, detailDog }) {

    const notFound = "https://media.istockphoto.com/photos/pointer-dog-looking-into-the-box-with-surprise-picture-id1195730501?k=6&m=1195730501&s=612x612&w=0&h=jV0l1hQubkChu57A_Y6wDWRxzZ-ezf9mgrc9dL4g6Dg="

    const loading = "https://img.wattpad.com/ce00d7500eb37a2ddd990ee3abdb080f15f10d21/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f32524c6464573337424f694e32773d3d2d3537313733383330342e313532633837333730633066313666343837383530383830323730362e676966"


    const [temp, setTemp] = useState("")

    useEffect(() => {
        resetInfo()
        getTemperaments();
    }, [getTemperaments,resetInfo])

    async function handleClick(nameId) {
        if (typeof nameId !== "number") {
            setTemp(nameId)
            await getDogsFilter({ filterTemperaments: nameId })
        }
        detailDog(nameId)
    }

    return (
        <div className="temperaments">
            {
                dogsFilter === null ? Stemp === null ? <img src={loading} alt="cargando" /> : Stemp.length === 0 ?

                <Link to="/home" onClick={handleClick}>
                <img src={notFound} alt="cargando" /> 
            </Link>  : Stemp.map(e =>
                        <Link
                            className="temp-l"
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