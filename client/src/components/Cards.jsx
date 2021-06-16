import CardDog from "./CardDog"
import { connect } from "react-redux"
import { useEffect } from "react"
import { detailDog, getDogs, resetInfo } from "../reducer/actions"
import { Link } from "react-router-dom"

function Cards({ dogs, getDogs, infoPage, resetInfo, detailDog }) {

    useEffect(() => {
        getDogs( infoPage );
    }, [infoPage])

    function handleClick(id) {
        resetInfo()

        if(typeof id === "number") detailDog(id)
    }

    return (
        <div className="cards">
            {
                dogs === null ? <h1> Cargando </h1> : dogs[0].error ?
                    <Link to="/dogs" onClick={handleClick}> Breed not found</Link> :
                    dogs.map(e =>
                        <Link to={`/dogs/${e.name}`} onClick={() => handleClick(e.id)} key={e.id}>
                            <CardDog
                                id={e.id}
                                name={e.name}
                                temperaments={e.temperaments}
                                image={e.image}
                            />
                        </Link>)
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
        resetInfo: () => dispatch(resetInfo()),
        detailDog: (id) => dispatch(detailDog(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)


// function Cards({ dogs, getDogs, infoPage, resetInfo, detailDog }) {
//     const { name, page, order, filterSource } = infoPage;

//     useEffect(() => {
//         getDogs(
//             name,
//             page,
//             order,
//             filterSource,
//         );
//     }, [infoPage])

//     function handleClick(id) {
//         resetInfo()

//         if(typeof id === "number") detailDog(id)
//     }

//     return (
//         <div className="cards">
//             {
//                 dogs === null ? <h1> Cargando </h1> : dogs[0].error ?
//                     <Link to="/dogs" onClick={handleClick}> Breed not found</Link> :
//                     dogs.map(e =>
//                         <Link to={`/dogs/${e.name}`} onClick={() => handleClick(e.id)} key={e.id}>
//                             <CardDog
//                                 id={e.id}
//                                 name={e.name}
//                                 temperaments={e.temperaments}
//                                 image={e.image}
//                             />
//                         </Link>)
//             }
//         </div>
//     )
// }

// function mapStateToProps(state) {
//     return {
//         dogs: state.dogs,
//         temperaments: state.temperaments,
//         infoPage: state.infoPage
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getDogs: (name, page, order, filterSource) => {
//             dispatch(getDogs(name, page, order, filterSource))
//         },
//         resetInfo: () => dispatch(resetInfo()),
//         detailDog: (id) => dispatch(detailDog(id))
//     }
// }