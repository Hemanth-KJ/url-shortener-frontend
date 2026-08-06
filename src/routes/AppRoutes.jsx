import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreateUrl from "../pages/CreateUrl";
import MyUrls from "../pages/MyUrls";
import Analytics from "../pages/Analytics";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

function AppRoutes() {

    return (

        <Routes>

            {/* Public Routes */}

            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/create" element={<CreateUrl />} />

                <Route path="/my-urls" element={<MyUrls />} />

                <Route path="/analytics/:shortCode" element={<Analytics />} />

            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>

    );
}

export default AppRoutes;