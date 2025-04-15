import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store.tsx";

export default function getRole(){
    const userAuth = useSelector((store: RootState) => store.auth.user);
    return userAuth?.role ||  null;
}

