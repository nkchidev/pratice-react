import { Routes, Route } from "react-router-dom";
import Home from '../component/Home';
import TableUsers from '../component/TableUsers';
import Login from '../component/Login';
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
    return (<>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path="/users" element={
                <PrivateRoute>
                    <TableUsers />
                </PrivateRoute>
            } />

        </Routes>
    </>)
}

export default AppRoutes;