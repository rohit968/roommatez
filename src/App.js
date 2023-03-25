import "./app.scss";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  SignupPage,
  SigninPage,
  Layout,
  AccountPage,
  ProfilePage,
  BookingsPage,
  AccomodationsPage,
  NewPlacePage,
} from "./pages/index";
import Header from "./components/header/Header";
import { UserContextProvider } from "./UserContext";
import axios from "axios";
import Account from "./components/account/Account";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />}>
            <Route path="myprofile" element={<ProfilePage />} />
            <Route path='bookings' element={<BookingsPage />} />
            <Route path='places' element={<AccomodationsPage />} />
            <Route path='places/new' element={<NewPlacePage />} />
          </Route>
          <Route path='*' element={<SigninPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
