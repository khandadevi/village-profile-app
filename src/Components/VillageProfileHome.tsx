import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  addNewUser,
  deleteUser,
  getAllUsers,
  IUser,
} from "../db/models/UserModel";
import api from "../Api/api";
import { syncDb } from "../db/seed";
import { deleteAllData } from "../db/models/Household";

const initialAuth = {
  name: "",
  username: "",
  phone: "",
  password: "",
  office_name: "",
  office_id: "",
} as IUser;
export default function VillageProfileHome() {
  const [auth, setAuth] = useState(initialAuth as IUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    checkUser();
    // checkGeoLocation();
  }, []);

  // const checkGeoLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((positions: any) => {
  //       console.log(positions);
  //     });
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // };

  const handleValueChance = (e: any) => {
    e.persist();
    setAuth((auth) => ({
      ...auth,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    let res;
    // For JSON Server
    if (process.env.REACT_APP_SERVER === "https://vp.khandadevi.com/") {
    // if (process.env.REACT_APP_SERVER === "https://demo.khandadevi.com/") {
    // if (process.env.REACT_APP_SERVER === "http://localhost:8000/") {
      // if (process.env.REACT_APP_SERVER === "http://192.168.10.33:8000/") {
      res = await api.loginJsonServer();
    }else{
      res = await api.login(auth);
    }
    if (res.data) {
      let data = res.data;
      await addNewUser(data);
      setAuth({ ...data });
    } else {
      setError("Username or Password did not match!");
    }
    setLoading(false);
  };

  const checkUser = async () => {
    let auth = await getAllUsers();
    if (auth.length) {
      setAuth({ ...auth[0] });
    }
  };

  const syncServerData = async () => {
    setLoading(true);
    await syncDb(auth);
    console.log("sync", auth)
    setLoading(false);
  };

  const logout = () => {
    setAuth({ ...initialAuth });
    deleteUser();
  };

  const handleDelete = async (e:any) => {
    let res = await deleteAllData(e.target.value)
    if(res){
      history.push("/village-profile-app")
    }
  }

  if (loading) {
    return <div className="vp-home">Server Loading...</div>;
  }
  if (!auth.id) {
    return (
      <div className="vp-home">
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="username"
              placeholder="Username"
              name="username"
              value={auth?.username}
              onChange={handleValueChance}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={auth?.password}
              onChange={handleValueChance}
              required
            />
          </div>
          <p style={{ color: "red" }}>{error}</p>
          <button>Submit</button>
        </form>
      </div>
    );
  }
  return (
    <div className="vp-home">
      <div className="welcome">
        Welcome         {auth?.name}        
      </div>
      
      {/* <Link to="/village-profile-app/app/add-new">Add New Household</Link> */}
      <Link to="/village-profile-app/app/add-new">नयाँ घरमुली</Link>
      {/* <Link to="/village-profile-app/app/pending">Pending Data</Link> */}
      <Link to="/village-profile-app/app/pending"> पठाउन बाँकी डाटा</Link>
      {/* <Link to="/village-profile-app/app/incomplete">Incomplete Data</Link> */}
      <Link to="/village-profile-app/app/incomplete">नसकिएको डाटा</Link>
      {/* <Link to="/village-profile-app/app/all">All Data</Link> */}
      <Link to="/village-profile-app/app/all">सबै डाटा</Link>
      <button className="btn btn-sm btn-secondary" onClick={syncServerData}>
        डाटा तान्नुहोस
      </button>
      
      <p className="logout" onClick={logout}>
          Logout
        </p>
      <p>Version: 2.0</p>
      <input onChange={handleDelete} title="deleteall" placeholder="DELETE" className="col-md-3"></input>
    </div>
  );
}
