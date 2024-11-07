import { useSelector, useDispatch } from "react-redux";
import { login } from "./authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError, } = useSelector((state) => state.auth);

    const loginUser = (logindata) => {
        dispatch(login(logindata));
    };



    return {
        data, isLoading, isError, loginUser
    };
};
