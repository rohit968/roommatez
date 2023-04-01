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
  DetailsPage,
} from "./pages/index";
import { UserContextProvider } from "./UserContext";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:4000";
//axios.defaults.baseURL = "https://roommtez-backend.onrender.com/";
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
            <Route path='places/:id' element={<NewPlacePage />} />
          </Route>
          <Route path='place/:id' element={<DetailsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
