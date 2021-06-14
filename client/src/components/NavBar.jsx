import { connect } from "react-redux"
import { resetInfo, search } from "../reducer/actions"
import { useState } from "react"
import { Link } from "react-router-dom"
import { FaSearch } from 'react-icons/fa'

function CardDog({ search, resetInfo }) {
    const [input, setInput] = useState('');


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
    }

    return (
        <div className="navBar">
            <Link to="/dogs" onClick={handleClick}>
                <img alt="Logo" />
                <h2> Find Your Best Friend </h2>
            </Link>
            <form onSubmit={handleSubmit} >
                <input type="text" value={input} onChange={handleChange}/>
                <button type="submit"> <FaSearch/></button>
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

