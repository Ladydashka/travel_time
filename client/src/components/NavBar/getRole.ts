import {useSelector} from "react-redux";
import {RootState} from "../../redux/store/store.tsx";

export default function getRole(){
    const userAuth = useSelector((store: RootState) => store.auth.user);
    const userReg= useSelector((store: RootState) => store.registration.user);
    return userAuth?.role || userReg?.role || null;
}

