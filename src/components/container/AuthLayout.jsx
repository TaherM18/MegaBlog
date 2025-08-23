import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function AuthLayout({
    children,
    authentication = true
}) {
    
    const authStatus = useSelector((state) => (state.status));
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (authentication && authStatus) {
            navigate("/");
        }
        else {
            navigate("/login");
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    return  loader && <>{children}</>;
}
