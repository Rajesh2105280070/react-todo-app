import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";


export function UserDashboard() {

    const [cookies, setCookie, removeCookie] = useCookies('userid');
    const [appointments, setAppointments] = useState(([{ Appointment_Id: 0, Title: '', Description: '', Date: '' }]));
    const [EditTasks, setEditiTasks] = useState(([{ Appointment_Id: 0, Title: '', Description: '', Date: '' }]));
    let navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://127.0.0.1:7000/appointments/${cookies['userid']}`)
            .then(response => {
                setAppointments(response.data);
            });
    }, []);

    function handleSignout() {
        removeCookie('userid');
        navigate('/login');
        window.location.reload();
    }

    function handleDeleteClick(e) {
        axios.delete(`http://127.0.0.1:7000/delete-task/${e.target.name}`)
            .then(() => {
                alert('Appointment Deleted');
            });
        window.location.reload();
    }

    const formik = useFormik({
        initialValues: {
            Appointment_Id: 0,
            Title: '',
            Description: '',
            Date: '',
            UserId: cookies['userid']
        },
        onSubmit: (task) => {
            axios.post('http://127.0.0.1:7000/add-task', task);
            alert('Task Added Successfully.....');
            window.location.reload();
        }
    });

    function handleEditClick(id){
        axios.get(`http://127.0.0.1:7000/get-task/${id}`)
        .then(response=>{
            setEditiTasks(response.data);
        });
    };

    const editFormik = useFormik({
        initialValues: {
            Appointment_Id: EditTasks[0].Appointment_Id,
            Title: EditTasks[0].Title,
            Description: EditTasks[0].Description,
            Date: EditTasks[0].Date,
            UserId: EditTasks[0].UserId
        },
        onSubmit: (task) => {
             // axios PUT  http://127.0.0.1:7000/edit-task/1, data
        },
        enableReinitialize:true
    })

    return (
        <div className="bg-light p-4" style={{ height: '100vh', width: '100%' }}>
            <h2>Your Appointments <button onClick={handleSignout} className='btn btn-warning'>Signout</button> </h2>
            <div className="mb-3">
                <button data-bs-target="#addTask" data-bs-toggle="modal" className="btn btn-primary bi bi-calendar-check">Add Appointment</button>
                <div className="modal fade" id="addTask">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Add Appointment</h2>
                                <button data-bs-dismiss="modal" className="btn btn-close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={formik.handleSubmit} className="form">
                                    <dl>
                                        <dt>Appointment_Id</dt>
                                        <dd> <input type="text" onChange={formik.handleChange} className="form-control" name="Appointment_Id" /> </dd>
                                        <dt>Title</dt>
                                        <dd> <input type="text" onChange={formik.handleChange} name="Title" className="form-control" /> </dd>
                                        <dt>Description</dt>
                                        <dd>
                                            <textarea rows="4" onChange={formik.handleChange} cols="40" name="Description" className="form-control"></textarea>
                                        </dd>
                                        <dt>Date</dt>
                                        <dd><input type="date" onChange={formik.handleChange} className="form-control" name="Date" /></dd>
                                    </dl>
                                    <button type="submit" className="btn btn-warning">Add Task</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                appointments.map(appointment =>
                    <div key={appointment.Appointment_Id} className="alert alert-success alert-dismissible">
                        <button className="btn btn-close" data-bs-dismiss="alert"></button>
                        <button name={appointment.Appointment_Id} onClick={handleDeleteClick} className="btn btn-danger bi bi-trash-fill  mb-3"></button>
                        <h2>{appointment.Title}</h2>
                        <p>{appointment.Description}</p>
                        <p>{appointment.Date}</p>
                        <button onClick={()=>handleEditClick(appointment.Appointment_Id)} data-bs-target="#editTask" data-bs-toggle="modal" className="btn btn-warning bi bi-pen-fill">Edit</button>
                    </div>
                )
            }
            <div className="modal fade" id="editTask">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Edit Task</h2>
                            <button className="btn btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editFormik.handleSubmit} className="form">
                                <dl>
                                    <dt>Title</dt>
                                    <dd><input value={EditTasks[0].Title} type="text" onChange={editFormik.handleChange} className="form-control" name="Title" /></dd>
                                    <dt>Description</dt>
                                    <dd>
                                        <textarea value={EditTasks[0].Description} onChange={editFormik.handleChange} className="form-control" name="Description" cols="40" rows="4"></textarea>
                                    </dd>
                                    <dt>Date</dt>
                                    <dd><input value={EditTasks[0].Date} onChange={editFormik.handleChange} type="date" className="form-control" name="Date" /></dd>
                                </dl>
                                <button type="submit" className="btn btn-success">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}