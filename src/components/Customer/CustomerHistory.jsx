import { useState, useEffect } from "react";
import { InputGroup, Form } from "react-bootstrap";

import CardHistory from "./CardHistory";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage";
import { axiosInstance as axios } from "../../config/https";
import { PaginationControl } from "react-bootstrap-pagination-control";

export default function CustomerHistory() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const _id = user._id

    const [isLoad, setIsload] = useState(true)
    const [dataHistory, setDataHistory] = useState([])
    const [totalExpense, setTotalExpense] = useState(0)

    const [params, setParams] = useState({
        q: '',
        sort_by: 'desc',
        page: 1,
        per_page: 10
    });

    const [totalData, setTotalData] = useState(0)

    function handleChange(event) {
        const key = event.target.name
        setParams({ ...params, [key]: event.target.value })
        setIsload(true)
    }

    function handleChangeSearch(event) {
        const key = event.target.name
        setParams({ ...params, [key]: event.target.value })

        if (event.target.value.length === 0) setIsload(true)
    }

    function handleSubmit(event) {
        event.preventDefault()
        setIsload(true)
    }

    function handlePagination(page) {
        setParams({ ...params, page })
        setIsload(true)
    }

    useEffect(() => {
        if (isLoad) {
            // SET LOADING
            dispatch({ type: "SET_LOADING", value: true })
            axios.get(`/checkout/${_id}/history`, { params: { ...params } }).then((response) => {
                setDataHistory(response.data.data.data)
                setTotalExpense(response.data.data.total_expense)
                setTotalData(response.data.pagination.total)
            }).catch((error) => {
                const message = error.response?.data?.message;
                toast(handleErrorMessage(message), {
                    position: toast.POSITION.TOP_RIGHT,
                    type: toast.TYPE.ERROR,
                });
            })
                .finally(() => {
                    // SET LOADING
                    dispatch({ type: "SET_LOADING", value: false })
                    setIsload(false)
                })
        }
    }, [isLoad, _id, params, dispatch])

    return (
        <>
            {/* SHORT & SEARCH */}
            <Form className="mt-md-0 mt-2 mb-4" onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Select
                        name="sort_by"
                        value={params.sort_by}
                        onChange={handleChange}
                        style={{ width: '10%' }}
                    >
                        <option value="asc">ASC</option>
                        <option value="desc">DESC</option>
                    </Form.Select>

                    <Form.Control
                        name="q"
                        value={params.q}
                        onChange={handleChangeSearch}
                        placeholder="Search by code invoice"
                        style={{ width: '90%' }}
                    />
                </InputGroup>
            </Form>

            {/* CARD HISTORY */}
            <div style={{ height: 'calc(100vh - 20rem)', overflow: 'auto' }} className="mb-4">
                {
                    dataHistory.map((detail, index) => (
                        <CardHistory key={`card-history-${index}-${detail.invoice}`} detail={detail} />
                    ))
                }
            </div>

            {/* PAGINATION */}
            <div className="d-flex justify-content-between align-items-center">
                <h5>Total expense: {totalExpense}</h5>
                <div className="d-flex justify-content-between align-items-center">
                    <Form.Select
                        name="per_page"
                        value={params.per_page}
                        onChange={handleChange}
                        className="w-auto me-4 mb-3"
                    >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </Form.Select>

                    <PaginationControl
                        page={params.page}
                        limit={params.per_page}
                        total={totalData}
                        ellipsis={2}
                        changePage={handlePagination}
                    >
                    </PaginationControl>
                </div>
            </div>
        </>
    )
}