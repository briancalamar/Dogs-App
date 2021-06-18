import { connect } from "react-redux"
import { resetInfo, search } from "../reducer/actions"
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FaSearch } from 'react-icons/fa'

function CardDog({ search, resetInfo }) {
    const [input, setInput] = useState('');
    const history = useHistory()


    function handleChange(e) {
        setInput(e.target.value);
    }

    function handleClick() {
        resetInfo()
    }

    function handleSubmit(e) {
        e.preventDefault();
        resetInfo()
        search(input)
        setInput("")
        history.push("/home")
    }

    return (
        <div className="navBar">
            <Link to="/home" onClick={handleClick}>
                <img alt="Logo" />
                <h2> Find Your Best Friend </h2>
            </Link>
            <ul>
                <li>
                    <Link to="/home" onClick={handleClick}> Home </Link>
                    <Link to="/createdog"> Create Dog </Link>
                    <Link to="/temperaments"> Temperaments </Link>
                </li>
            </ul>
            <form onSubmit={handleSubmit} >
                <input type="text" value={input} onChange={handleChange} />
                <button type="submit"> <FaSearch /></button>
            </form>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        search: (name) => dispatch(search(name)),
        resetInfo: () => dispatch(resetInfo())
    }
}

export default connect(null, mapDispatchToProps)(CardDog)

