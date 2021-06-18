import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { createDog, getTemperaments } from "../reducer/actions"
import { Link } from "react-router-dom"


function CreateDog({ Stemp, getTemperaments, createDog}) {
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

    const empyImage = "https://st.depositphotos.com/1798678/3986/v/600/depositphotos_39864187-stock-illustration-dog-silhouette-vector.jpg"

    useEffect(() => {
        getTemperaments();
    }, [])

    function handleChange(e) {
        console.log(e.target.name)
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
        await createDog(dog)
        alert(" Breed created. Find your dog by name")
    }

    return (
        <div className="createDog">
            <div className="infoDog">
                <form method="post" action="/dog" onSubmit={handleSubmit}>
                    <p>Name</p>
                    <input type="text"
                        name="name"
                        onChange={handleChange} required />
                    <p>Weight</p>
                    <input type="text"
                        placeholder="Miminum weight"
                        name="weightMin"
                        onChange={handleChange} required />
                    <input type="text"
                        placeholder="Maximum weight"
                        name="weightMax"
                        onChange={handleChange} required />
                    <p>Height</p>
                    <input type="text"
                        placeholder="Miminum height"
                        name="heightMin"
                        onChange={handleChange} required />
                    <input type="text"
                        placeholder="Maximum height"
                        name="heightMax"
                        onChange={handleChange} required />
                    <p>Temperaments</p>
                    {
                        Stemp === null ? <p> Loading </p> :
                            <select name="temperaments" onChange={handleChange}>
                                {
                                    Stemp.map((e) => <option key={e.id}>{`${e.name} | ${e.id}`}</option>)
                                }
                            </select>
                    }
                    <p>Life Span</p>
                    <input type="text" name="life_span" onChange={handleChange} />
                    <input type="text" name="image" onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            {/* --------------------------------------------------------------------- */}
            <div className="prevDog">
                {
                    dog === null ? <img src="https://i.imgur.com/lcBJyGn.gif" alt="cargando" /> :
                        <div>
                            <div className="prevDog">
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
                            <img src={dog.image || empyImage} alt="Image Dog" />
                        </div>
                }
            </div>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        getTemperaments: () => dispatch(getTemperaments()),
        createDog: (info) => dispatch(createDog(info))
    }
}

function mapStateToProps(state) {
    return {
        Stemp: state.temperaments,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDog)