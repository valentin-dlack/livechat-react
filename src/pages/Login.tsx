import {FormEvent, Fragment, useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import loading_gif from '../assets/loading.gif'
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState('')
       
    const onLogin = (e: FormEvent) => {

        if (!email || !password) {
            setError('Veuillez remplir tous les champs !')
            return;
        }

        setLoading(true)
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            setLoading(false)
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Informations de connexion incorrectes !')
                    break;
                case 'auth/user-not-found':
                    setError('Utilisateur non trouvé !')
                    break;
                case 'auth/invalid-credential':
                    setError('Informations de connexion incorrectes !')
                    break;
                default:
                    setError('Une erreur est survenue !')
                    break;
            }
            setLoading(false)
        });
       
    }
 
    return(
        <Fragment>
            <section className="bg-gray-50 dark:bg-gray-900 bg-login">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white/10 backdrop-blur-2xl dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Se Connecter
                            </h1>
                            {error && (
                                <div className="alert alert-error alert-dismissible">
                                    <div className="flex-1">
                                        <label>{error}</label>
                                    </div>
                                </div>
                            )}
                                <div>
                                    <label htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="string" className="input input-bordered w-full" onChange={(e) => setEmail(e.target.value)} id="username" placeholder="Email" />

                                    <label htmlFor="password"
                                        className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                                        <input type="password" className="input input-bordered w-full" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
                                </div>

                                <button type="submit" className="w-full btn btn-lg btn-primary" onClick={onLogin}>
                                    {loading ? <img src={loading_gif} alt="loading" className="w-6 h-6" /> : 'Se connecter'}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Je n'ai pas de compte ! 
                                    <NavLink to="/register" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">S'inscrire</NavLink>
                                </p>
                                <input type="hidden" name="_csrf_token" value="#" />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
 
export default Login