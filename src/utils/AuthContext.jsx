import { createContext , useState ,  useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [loading , setLoading] = useState(true);
    const [user , setUser] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        getUserOnLoad();
    },[])

    const getUserOnLoad = async () => {
        try{

            const accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");

        }catch(error){
            console.info(error)
        }
        setLoading(false)
    }

    const handleUserLogin = async (e , credentials) => {
        e.preventDefault();
        try{
            const response =  await account.createEmailSession(credentials.email, credentials.password);

            console.log("Logged In", response);

            const accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        }catch(error){
            console.error(error)
        }
    }

    const handleUserLogout = async () => {
        account.deleteSession('current');
        setUser(null);
    }

    const handleUserRegister = async (e , credentials) => {
        e.preventDefault();

        if(credentials.password !== credentials.confirmPassword){
            alert("Passwords don't match ..")
            return
        }

        try {

            const response = account.create(ID.unique() , credentials.email , credentials.password , credentials.name)

            console.log("Registered", response)

             navigate("/login");
            
        } catch (error) {
            console.error(error);            
        }
    }

    const contextData = {
      user,
      handleUserLogin,
      handleUserLogout,
      handleUserRegister,
    };

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
}

export const useAuth = () => {return useContext(AuthContext);}

export default AuthContext;