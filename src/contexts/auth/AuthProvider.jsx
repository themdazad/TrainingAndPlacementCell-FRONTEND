import AuthContext from "./AuthContext";

const isAdminLoggedin = localStorage.getItem("isAdminLoggedin");

const isLogedIn = {
    admin: false,
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
