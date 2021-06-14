import CardDog from "./CardDog"
import { connect } from "react-redux"
import { useEffect } from "react"
import { getDogs } from "../reducer/actions"

function Cards({ dogs, getDogs }) {

    useEffect(() => {
        getDogs();
    }, [getDogs])

    return (
        <div className="cards">
            {
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
        temperaments: state.temperaments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDogs: () => { dispatch(getDogs()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)