import { connect } from "react-redux";


function DogDetail({dogs}){
        
    return (
        <div>
            <h1>Dog detail</h1>
            <h1>{dogs[0].name}</h1>
            {/* <label>Min weigth</label>
            <p>{dog.name}</p> */}
        </div>
    )
}

function mapStateToProps(state){
    return {
        dogs: state.dogs
    }
}

export default connect(mapStateToProps)(DogDetail)

