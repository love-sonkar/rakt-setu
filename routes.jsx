import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";
import Crisis from "./components/dashboard/component/Crisis.jsx";
import Impact from "./components/dashboard/component/Impact.jsx";
import Solution from "./components/dashboard/component/Solution.jsx";
import UserRequestForm from "./components/UserRequestForm.js";
import InventoryManager from "./components/dashboard/InventoryManager.js";
import Footer from "./components/common/Footer.jsx";
import PageNav from "./components/common/PageNav.jsx";
import BecomeADonerForm from "./components/dashboard/component/BecomeADonerForm.jsx";
import Testimonial from "./components/dashboard/component/Testimonial.jsx";
import Dashboard from "./components/Dashboard.js";
import EmergencyPage from "./components/dashboard/component/EmergencyPage.jsx";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/crisis",
        element: <Crisis />,
    },
    {
        path: "/emergency",
        element: <EmergencyPage />,
    },
    {
        path: "/impact",
        element: <Impact />,
    },
    {
        path: "/solution",
        element: <Solution />,
    },
    {
        path: "/userrequest",
        element: <div>
            <PageNav />
            <div className="mt-16 mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <UserRequestForm />
            </div>
            <Footer />
        </div>,
    },
    {
        path: "/donersignup",
        element:
            <div>
                <PageNav />
                <div className="mt-16 mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BecomeADonerForm />
                </div>
                <Footer />
            </div>,
    },
    {
        path: "/testimonial",
        element: <Testimonial />
    },
    {
        path: "/inverntory",
        element:
            <div>
                <PageNav />
                <div className="mt-16 mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <InventoryManager />
                </div>
                <Footer />
            </div>,
    },
    {
        path: "*",
        element: <App />,
    }

]);

export default routes;