import { Outlet } from "react-router-dom"
import SideDrawer from "./components/Drawer"

const Layout = () => {
    return<>
    <SideDrawer>
        <Outlet />
    </SideDrawer>
    </>
}

export default  Layout