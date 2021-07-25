import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { createDog, getTemperaments } from "../reducer/actions"
import './Style/CreateDog.css'
import { IoPawSharp } from 'react-icons/io5'


export default function CreateDog() {

    const temperaments = useSelector( store => store.temperaments)
    const dispatch = useDispatch()

    const [dog, setDog] = useState({
        name: undefined,
        heightMin: undefined,
        heightMax: undefined,
        weightMin: undefined,
        weightMax: undefined,
        life_span: undefined,
        image: undefined,
        temperaments: []
    })

    let history = useHistory()

    const emptyImage = "https://st.depositphotos.com/1798678/3986/v/600/depositphotos_39864187-stock-illustration-dog-silhouette-vector.jpg"

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch])

    function handleChange(e) {
        if (e.target.name === "temperaments") {
            let include = dog.temperaments.includes(e.target.value)

            include === false ?
                setDog({
                    ...dog,
                    temperaments: [...dog.temperaments, e.target.value]
                }) :
                setDog({
                    ...dog,
                    temperaments: dog.temperaments.filter(t => t !== e.target.value)
                })
        } else {
            setDog({
                ...dog,
                [e.target.name]: e.target.value
            })
        }

    }

    async function handleSubmit(e) {
        e.preventDefault();
        await dispatch(createDog(dog));
        alert(" Breed created. Find your dog by name");
        history.push(`/home`)
    }

    return (
        <div className="createDog">
            <div className="infoDog">
                <form method="post" action="/dog" onSubmit={handleSubmit}>
                    <p>Name</p>
                    <input type="text"
                        name="name"
                        placeholder="    Name"
                        onChange={handleChange} required />
                    <p>Weight</p>
                    <input type="text"
                        placeholder="    Miminum weight"
                        name="weightMin"
                        onChange={handleChange} required />
                    <input type="text"
                        placeholder="    Maximum weight"
                        name="weightMax"
                        onChange={handleChange} required />
                    <p>Height</p>
                    <input type="text"
                        placeholder="    Miminum height"
                        name="heightMin"
                        onChange={handleChange} required />
                    <input type="text"
                        placeholder="    Maximum height"
                        name="heightMax"
                        onChange={handleChange} required />
                    <p>Temperaments</p>
                    {
                        temperaments === null 
                        ? <p> Loading </p> 
                        : <select name="temperaments" onChange={handleChange}>
                                {
                                    temperaments.map((e) => <option key={e.id}>{`${e.name} | ${e.id}`}</option>)
                                }
                            </select>
                    }
                    <p>Life Span</p>
                    <input 
                    type="text" 
                    name="life_span"
                    placeholder="    Life span ej(10-11)" 
                    onChange={handleChange} />
                    <input 
                    type="text" 
                    name="image"
                    placeholder="    Insert URL image" 
                    onChange={handleChange} />
                    <button type="submit"><IoPawSharp/></button>
                </form>
            </div>
            {/* --------------------------------------------------------------------- */}
            <div className="prevDog">
                <div className="prevDog-d">
                    {
                        dog.name ? <h1>{dog.name}</h1> : <p>-</p>
                    }
                    <div>
                        <div>
                            <label >Minimum weight</label>
                            {
                                dog.weightMin ? <p>{dog.weightMin}</p> : <p>-</p>
                            }
                            <label >Maximum weight</label>
                            {
                                dog.weightMax ? <p>{dog.weightMax}</p> : <p>-</p>
                            }
                        </div>
                        <div>
                            <label >Minimum height</label>
                            {
                                dog.heightMin ? <p>{dog.heightMin}</p> : <p>-</p>
                            }
                            <label >Maximum height</label>
                            {
                                dog.heightMax ? <p>{dog.heightMax}</p> : <p>-</p>
                            }
                        </div>
                    </div>
                    <ul>
                        {
                            dog.temperaments === undefined || dog.temperaments.length === 0 ? <h3>No data</h3> :
                                dog.temperaments.map((e, i) => <li key={i}> {e} </li>)
                        }
                    </ul>
                    <section>
                        <h4> Life span </h4>
                        {
                            dog.life_span ? <p>{dog.life_span}</p> : <p>-</p>
                        }
                    </section>
                </div>
                <div className="prevDog-d prevDog-d-img">
                    <img src={dog.image || emptyImage} alt="Dog" />
                </div>
            </div>
        </div>
    )
}
