import { connect } from "react-redux";
import { infoPage, resetInfo } from "../reducer/actions";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

function Sorts({ infoPage, page }) {
    const [sort, setSort] = useState({
        page: 1,
        order: "na",
        filterSource: undefined,
    })

    useEffect(()=>{        
        if(page === 1){
            setSort({
                ...sort,
                page,
            })
        }
    },[page])

    function handleClick(e) {
        e.preventDefault();
        let event = e.target.title;
        let value = e.target.value;

        if (event === "order") {
            (value === "wd" || value === "wa") ?
                setSort({
                    page: 1,
                    order: value,
                    filterSource: undefined,
                }) :
                setSort({
                    ...sort,
                    page: 1,
                    order: value,
                })
        };
        if (event === "filterSource") {
            (sort.order === "wd" || sort.order === "wa") ?
                setSort({
                    page: 1,
                    order: undefined,
                    filterSource: value,
                }) :
                setSort({
                    ...sort,
                    page: 1,
                    filterSource: value,
                })
        };
        if (event === "reset") {
            setSort({
                page: 1,
                order: "na",
                filterSource: undefined,
            })
        };


    }

    function handleSubmit(e) {
        e.preventDefault()
        infoPage(sort)
    }

    async function handlePage(e) {
        let event = e.target.title;

        if (event === "next") setSort({ ...sort, page: ++sort.page })

        if (sort.page > 1 && event === "previous") {
            setSort({ ...sort, page: --sort.page})
        }
        infoPage({ page: sort.page })
    }

    return (
        <div className="sort">
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label> Sort By </label>
                        <select name="Sort by" >
                            <option
                                title="order"
                                value="wa"
                                onClick={handleClick}> Weight: Min to Max </option>
                            <option
                                title="order"
                                value="wd"
                                onClick={handleClick}> Weight: Max to Min </option>
                            <option
                                title="order"
                                value="na"
                                onClick={handleClick}> Name: A to Z </option>
                            <option
                                title="order"
                                value="nd"
                                onClick={handleClick}> Name: Z to A </option>
                        </select>
                    </div>
                    <div>
                        <label> Filter By </label>
                        <button
                            value="bd"
                            type="button"
                            title="filterSource"
                            onClick={handleClick}> Created by users </button>
                        <button
                            value="api"
                            type="button"
                            title="filterSource"
                            onClick={handleClick}> Pre Created </button>
                    </div>
                    <button type="submit" onSubmit={handleSubmit}> apply </button>
                </form>
                <button onClick={handleClick} title="reset"> Reset all </button>
                <Link to="/temperaments"><button>Temperaments</button></Link>
            </div>
            <div>
                <button type="button" title="previous" onClick={handlePage}>Previous</button>
                <button type="button" title="next" onClick={handlePage}>Next</button>
            </div>

        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        infoPage: (data) => dispatch(infoPage(data)),
        resetInfo: () => dispatch(resetInfo())
    }
}

function mapStateToProps(state){
    return{
        page: state.infoPage.page
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sorts)

