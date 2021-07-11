import CardDog from "./CardDog"
import { connect } from "react-redux"
import { useEffect } from "react"
import { detailDog, getDogs, resetInfo } from "../reducer/actions"
import { Link } from "react-router-dom"
import './Style/Cards.css'

function Cards({ dogs, getDogs, infoPage, resetInfo, detailDog }) {

    const notFound = "https://media.istockphoto.com/photos/pointer-dog-looking-into-the-box-with-surprise-picture-id1195730501?k=6&m=1195730501&s=612x612&w=0&h=jV0l1hQubkChu57A_Y6wDWRxzZ-ezf9mgrc9dL4g6Dg="

    const loading = "https://img.wattpad.com/ce00d7500eb37a2ddd990ee3abdb080f15f10d21/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f32524c6464573337424f694e32773d3d2d3537313733383330342e313532633837333730633066313666343837383530383830323730362e676966"


    // const notFound = "client/src/img/notFound.jpg"

    // const loading = "client/src/img/loading.gif"

    useEffect(() => {
        getDogs(infoPage);
    }, [infoPage, getDogs])

    function handleClick(id) {
        resetInfo()

        if (typeof id === "number") detailDog(id)
    }
    return (
        <div className="cards">
            {
                dogs === null ?
                    <img src={loading} alt="cargando" /> :
                    dogs.length === 0 ?
                        <Link
                            to="/home"
                            onClick={handleClick}
                            className="cards-link">
                            <CardDog
                                id="404"
                                name="Dog Not Found"
                                temperaments={[]}
                                image={notFound}
                            />
                        </Link> :
                        dogs.map(e =>
                            <Link
                                to={`/home/${e.name}`}
                                onClick={() => handleClick(e.id)}
                                key={e.name}
                                className="cards-link">
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
        infoPage: state.infoPage,
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

