import { connect } from "react-redux";
import './Style/DogDetail.css'


function DogDetail({ dog }) {

    const loading = "https://img.wattpad.com/ce00d7500eb37a2ddd990ee3abdb080f15f10d21/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f32524c6464573337424f694e32773d3d2d3537313733383330342e313532633837333730633066313666343837383530383830323730362e676966"

    return (
        <div className="detailDog">
            {
                dog === null ? <img src={loading} alt="cargando" /> :
                    <div className="detail-c">
                        <div className="infoDog">
                            <h1>{dog.name}</h1>
                            <div >
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
                        <div className="imgDog">
                            <img src={`${dog.image}`} alt="Dog" />
                        </div>
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

