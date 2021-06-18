import CardDog from "./CardDog"
import DogError from "./Error"
import { connect } from "react-redux"
import { useEffect } from "react"
import { detailDog, getDogs, resetInfo } from "../reducer/actions"
import { Link } from "react-router-dom"

function Cards({ dogs, getDogs, infoPage, resetInfo, detailDog }) {

    const img = "https://media.istockphoto.com/photos/pointer-dog-looking-into-the-box-with-surprise-picture-id1195730501?k=6&m=1195730501&s=612x612&w=0&h=jV0l1hQubkChu57A_Y6wDWRxzZ-ezf9mgrc9dL4g6Dg="

    useEffect(() => {
        getDogs(infoPage);
    }, [infoPage])

    function handleClick(id) {
        resetInfo()

        if (typeof id === "number") detailDog(id)
    }

    return (
        <div className="cards">
            {
                dogs === null ? <img src="https://i.imgur.com/lcBJyGn.gif" alt="cargando" /> : dogs.length === 0 ?
                    <Link to="/home" onClick={handleClick}>
                        <DogError/>
                    </Link> :
                    dogs.map(e =>
                        <Link to={`/home/${e.name}`} onClick={() => handleClick(e.id)} key={e.id}>
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