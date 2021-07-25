import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { infoPage, resetInfo } from "../reducer/actions";
import './Style/Sorts.css'

export default function Sorts() {

    const dispatch = useDispatch()
    const page = useSelector(store => store.infoPage.page)

    const [sort, setSort] = useState({
        page: 1,
        order: "na",
        filterSource: undefined,
    })

    useEffect(() => {
        if (page === 1) {
            setSort({
                ...sort,
                page,
            })
        }
    }, [page, sort])

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
            if (value === "all") {
                setSort({
                    ...sort,
                    page: 1,
                    filterSource: undefined,
                })
            }
            else {

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
            }
        };
        if (event === "reset") {
            dispatch(resetInfo())
        };


    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(infoPage(sort))
    }

    async function handlePage(e) {
        let event = e.target.title;

        if (event === "next") setSort({ ...sort, page: ++sort.page })

        if (sort.page > 1 && event === "previous") {
            setSort({ ...sort, page: --sort.page })
        }
        dispatch(infoPage({ page: sort.page }))
    }

    return (
        <div className="sort">
            <form onSubmit={handleSubmit}
                className="sort-form">
                <div className="sort-select">
                    <p className="sort-p"> Sort By </p>
                    <select name="Sort by" className="sort-btn">
                        <option selected disabled>Select</option>
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
                <div className="sort-filter">
                    <p className="sort-p"> Filter By </p>
                    <select name="Filter by" className="sort-btn">
                        <option selected disabled>Select</option>
                        <option
                            title="filterSource"
                            value="all"
                            onClick={handleClick}> All </option>
                        <option
                            title="filterSource"
                            value="bd"
                            onClick={handleClick}> Created by users  </option>
                        <option
                            title="filterSource"
                            value="api"
                            onClick={handleClick}> Pre Created </option>
                    </select>
                </div>
                <div className="sort-send">
                    <button
                        onClick={handleClick}
                        title="reset"
                        className="sort-btn"> Reset all </button>
                    <button
                        type="submit"
                        onSubmit={handleSubmit}
                        className="sort-btn"> Apply </button>
                </div>
                <div className="sort-temp">
                    <p className="sort-p">Temperaments</p>
                    <Link to="/temperaments"><button className="sort-btn">Temperaments</button></Link>
                </div>
            </form>
            <div className="next-prev">
                <p className="sort-p">Page</p>
                <div className="next-p-b">
                    <button type="button" title="previous" onClick={handlePage}>Previous</button>
                    <button type="button" title="next" onClick={handlePage}>Next</button>
                </div>
            </div>
        </div>
    )
}


