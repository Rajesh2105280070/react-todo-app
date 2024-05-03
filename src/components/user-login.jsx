import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export function UserLogin()
{

    const [users, setUsers] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies('userid'); 
    let navigate = useNavigate();

    useEffect(()=>{

        axios.get('http://127.0.0.1:7000/users')
        .then(response=>{
            setUsers(response.data);
        });
    },[]);

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },

        onSubmit : (formdata)=>{
            var userdetails = users.find(user=>user.UserId===formdata.UserId);
            if(userdetails.Password===formdata.Password){
                setCookie('userid', formdata.UserId);
                navigate('/dashboard');
                window.location.reload();
            } else{
                navigate("/invalid");
            }
        }
    });

    return(
        <div>
            <form onSubmit={formik.handleSubmit} className="bg-light p-2 form">
                <h2>User Login</h2>
                <dl>
                    <dt>User Id</dt>
                    <dd><input className="form-control" onChange={formik.handleChange} type="text" name="UserId" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} className="form-control" name="Password" /></dd>
                </dl>
                <button className="btn btn-warning w-100">Login</button>
            </form>
        </div>
    )
}