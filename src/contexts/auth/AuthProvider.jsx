import AuthContext from "./AuthContext";

const isAdminLoggedin = localStorage.getItem("isAdminLoggedin");

const isLogedIn = {
    admin: isAdminLoggedin,
    student: false,
  };

const AuthProvider = ({ children }) => {
    return(
        <AuthContext.Provider value={isLogedIn}>
            {children}
        </AuthContext.Provider>
    )
};
export default AuthProvider;
