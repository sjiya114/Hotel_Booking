import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const AppContext = createContext();
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
export const AppProvider = ({ children }) => {
    const nav = useNavigate();
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [rooms, setRooms] = useState([]);
    const fetchUser = async () => {

        try {

            const { data } = await axios.get("/user", {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            });
            if (data.success) {
                setIsOwner(data.role === "admin");
                console.log(data.data);
                setSearchedCities(data.data);
                console.log(searchedCities);
            }
            else {
                setTimeout(() => {
                    fetchUser();
                }, 5000);
            }

        } catch (error) {
              toast.error(error.message || "Something went wrong");
        }

    }
     
       const fetchRooms = async () => {
        try {

            const { data } = await axios.get("/rooms/getall");
           
            if (data.success) {
                setRooms(data.room);
                 console.log(rooms);
            }
            else {
                toast.error(data.error); 
            }

        } catch (error) {
            toast.error(error.message);
        }

    }

     useEffect(()=>
    {
      if(user)
      {
        fetchUser();
      }
    },[user])
     useEffect(()=>
    {
        fetchRooms();
        fetchUser();
    },[])

    const values = {
        isOwner, setIsOwner, showHotelReg, setShowHotelReg, token, setToken, user, setUser,searchedCities,setSearchedCities
        ,fetchUser,rooms,setRooms
    };
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export const UseAppContext = () => useContext(AppContext);