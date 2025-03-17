import AuthContext from "./AuthContext";

const isLogedIn = {
    admin: false,
    student: true,
  };

const AuthProvider = ({ children }) => {
    return(
        <AuthContext.Provider value={isLogedIn}>
            {children}
        </AuthContext.Provider>
    )
};
export default AuthProvider;