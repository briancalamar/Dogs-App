import { connect } from "react-redux";


function DogDetail({ dog }) {

    // const image = "https://thumbs.dreamstime.com/b/patr%C3%B3n-de-vectores-sin-fisuras-con-huella-pezu%C3%B1a-animal-ca%C3%B3tica-fondo-huellas-perros-173518478.jpg";

    // const image2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROG_ju_azqDR0b_G7ATBaECUJ0nx0UjbtjmQ&usqp=CAU"

    // const image3 = "https://media.istockphoto.com/vectors/seamless-vector-pattern-traces-of-paws-vector-id539440756?b=1&k=6&m=539440756&s=612x612&w=0&h=149YuwmttF07_avaHn9xp0YXDvPqvxlb_7hUfhbdl2M="


    return (
        <div>
            {
                dog === null ? <img src="https://i.imgur.com/lcBJyGn.gif" alt="cargando" /> :
                    <div>
                        <div className="infoDog">
                            <h1>{dog.name}</h1>
                            <div>
                                <div>
                                    <label >Minimum weight</label>
                                    <p>{dog.minWeight}</p>
                                    <label >Maximum weight</label>
                                    <p>{dog.maxWeight}</p>
                                </div>
                                <div>
                                    <label >Minimum height</label>
                                    <p>{dog.minHeight}</p>
                                    <label >Maximum height</label>
                                    <p>{dog.maxHeight}</p>
                                </div>
                            </div>
                            <ul>
                                {
                                    dog.temperaments === undefined || dog.temperaments.length === 0 ? <h3>No data</h3> :
                                        dog.temperaments.map(e => <li key={e}> {e} </li>)
                                }
                            </ul>
                            <section>
                                <h4> Life span </h4>
                                <p>{dog.life_span}</p>
                            </section>
                        </div>
                        <img src={`${dog.image}`} alt="Image Dog" />
                    </div>
            }
        </div>
    )
}


function mapStateToProps(state) {
    return {
        dog: state.detailDog
    }
}

export default connect(mapStateToProps)(DogDetail)

