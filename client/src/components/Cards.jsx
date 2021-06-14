import CardDog from "./CardDog"
import { connect } from "react-redux"
import { useEffect } from "react"
import { getDogs, resetInfo } from "../reducer/actions"
import { Link } from "react-router-dom"

function Cards({ dogs, getDogs, infoPage, resetInfo }) {
    const { name, page, order, filterSource } = infoPage;
    useEffect(() => {
        getDogs(
            name,
            page,
            order,
            filterSource,
        );
    }, [infoPage])

    return (
        <div className="cards">
            {
                dogs[0] === undefined ? <h1> Cargando </h1> :
                    dogs[0].error ? <Link to="/"> Dog not found</Link> :
                        dogs.map(e => <CardDog
                            id={e.id}
                            name={e.name}
                            temperaments={e.temperaments}
                            image={e.image}
                        />)
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        dogs: state.dogs,
        temperaments: state.temperaments,
        infoPage: state.infoPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDogs: (name, page, order, filterSource) => {
            dispatch(getDogs(name, page, order, filterSource))
        },
        resetInfo: () => dispatch(resetInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)

// getDogs(
//     infoPage.name, 
//     infoPage.page,
//     infoPage.order, 
//     infoPage.filterSource, 
//     infoPage.filterTemperaments
// )