import { Routes,Route } from "react-router-dom"
import Catagory from "../../pages/Catagory";
import Home from "../../pages/Home/Home";


function AppRoutes(){
    return <Routes>
        <Route path="/" element={<Home/>}></Route>
          <Route path="/:categoryId" element={<Catagory/>}></Route>
    </Routes>
}
export default AppRoutes;