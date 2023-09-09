import { Spinner }  from "react-bootstrap";

export default function Loading() {
    return (
        <>
            <div className="loading__overlay">
                <h1>
                    Loading <Spinner animation="grow" size="sm"/>
                    <Spinner animation="grow" className="mx-1"/>
                    <Spinner animation="grow" size="sm"/>
                </h1>
            </div>
        </>
    );
}