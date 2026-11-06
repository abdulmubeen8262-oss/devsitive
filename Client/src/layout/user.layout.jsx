import { Outlet } from "react-router-dom"
// import Navbar from "../components/common/navbar.component"

const UserLayout = () => {
    return (
        <div>
            {/* <Navbar/> */}
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default UserLayout