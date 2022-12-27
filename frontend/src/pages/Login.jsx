import {useState, useEffect} from 'react'
import {FaSignInAlt, FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, isError, isLoading, isSuccess, message} = 
    useSelector(
        (state) => state.auth
    )

    const onChange = (e) => {
        setFormData((previousState) => ({
            ...previousState, [e.target.name]: e.target.value
        }))
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess && user) {
            navigate('/')
        }

        dispatch(reset(), [isError, isLoading, isSuccess, user, message, navigate, dispatch]);
    })

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login to your account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                
                    <div className="form-group">
                        <input type="email" required className="form-control" name="email" id="email" value={email} onChange={onChange}
                        placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <input type="password" required className="form-control" name="password" id="password" value={password} onChange={onChange}
                        placeholder="Enter your password" />
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

export default Login