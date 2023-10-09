import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import Home from "../container/pages/dashboard/Home";
import Login from "../container/pages/login/Login";
import CategoryList from "../container/pages/category/CategoryList";
import GameList from "../container/pages/game/GameList";
import Settings from "../container/pages/settings/Settings";
import ChildCategory from "../container/pages/subcategory/ChildCategory";
import Author from "../container/pages/author/author"

//import Users from "../container/pages/user/UserList";
//import UsersList from "../container/pages/users/Users";
//import AddUser from "../container/pages/users/AddUser";

const RoutesConfig = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>

          
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/subCategory" element={<ChildCategory/>} />
          <Route path="/author" element={<Author/>} />
          <Route path="/game" element={<GameList />} />
          <Route path="/settings" element={<Settings />} />

          {/* <Route path="/users" element={<Users />} />
          <Route path="/user-list" element={<UsersList />} /> */}

          {/* <Route path="/add-user/">
            <Route index element={<AddUser />} />
            <Route path=":user_id" element={<AddUser />} />
          </Route> */}

          {/* <Route path="/add-test-new">
            <Route index element={<AddTest />} />
            <Route path=":id" element={<AddTest />} />
          </Route> */}

        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
