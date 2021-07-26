import { useSelector } from "react-redux";
import './Style/DogDetail.css'
import loading from '../img/Loading.gif'


export default function DogDetail() {

    const dog = useSelector( store => store.detailDog)

    console.log(dog)

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
                                    dog.temperaments === undefined || dog.temperaments.length === 0 
                                    ? <h3>No data</h3> 
                                    : dog.temperaments.map(e => <li key={e}> {e} </li>)
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

