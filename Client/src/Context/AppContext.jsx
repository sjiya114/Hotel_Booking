import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const AppContext = createContext();
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
export const AppProvider = ({ children }) => {
    const nav = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [paymentId,setPaymentId]=useState(localStorage.getItem("paymentLinkId"));
    const [bookingId,setBookingId]=useState(localStorage.getItem("bookingId"));
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [rooms, setRooms] = useState([]);
     const checkauth = async () => {
    try {
      const { data } = await axios.get("/user/checkuser",{
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            });
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const updateAfterPayment=async()=>
  {
    try {
            const { data } = await axios.post("/booking/updateInfo",{bookingId:bookingId,paymentId:paymentId}, {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            });
            if (data.success) {
                toast.success(data.message);
            }
        } catch (error) {
              toast.error(error.message || "Something went wrong");
        }
  }
    const payment=async(bookingId)=>
    {
        try {
            const { data } = await axios.get(`/booking/payment/${bookingId}`, {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            });
             console.log(data);
            if (data.success) {
                setPaymentId(data.resData.paymentLinkId);
                setBookingId(bookingId);
                localStorage.setItem("bookingId", bookingId);
localStorage.setItem("paymentLinkId", data.resData.paymentLinkId);
                window.location.href=data.resData.paymentLinkUrl; 
            }
        } catch (error) {
              toast.error(error.message || "Something went wrong");
        }
    }
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
       useEffect(()=>{
    checkauth();
},[]);
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
        ,fetchUser,rooms,setRooms,payment,updateAfterPayment,bookingId,paymentId
    };
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export const UseAppContext = () => useContext(AppContext);