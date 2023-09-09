import { useSelector } from "react-redux";

export default function Home() {
    const { user, token } = useSelector((state) => state.auth);

    return (
        <>
        <h1>Home Page</h1>
        {JSON.stringify(user)}
        {JSON.stringify(token)}
        </>
    );
};