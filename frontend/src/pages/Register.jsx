import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2 } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isError, isLoading, isSuccess, message} = 
    useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess && user) {
            navigate('/')
        }

        dispatch(reset(), [isError, isLoading, isSuccess, user, message, navigate, dispatch]);
    })

    const onChange = (e) => {
        setFormData((previousState) => ({
            ...previousState, [e.target.name]: e.target.value
        }))
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        if(password != password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }


    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" required className="form-control" name="name" id="name" value={name} onChange={onChange}
                        placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                        <input type="email" required className="form-control" name="email" id="email" value={email} onChange={onChange}
                        placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <input type="password" required className="form-control" name="password" id="password" value={password} onChange={onChange}
                        placeholder="Enter your password" />
                    </div>
                    <div className="form-group">
                        <input type="password" required className="form-control" name="password2" id="password2" value={password2} onChange={onChange}
                        placeholder="Confirm password" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register