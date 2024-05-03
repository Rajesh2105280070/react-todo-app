import { Link } from "react-router-dom";


export function UserInvalid()
{
    return(
        <div className="bg-light text-dark">
            <h3>Invalid Credentials</h3>
            <Link to='/login' >Try Again</Link>
        </div>
    )
}