import React, {FormEvent, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
 
const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const [error, setError] = useState('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setFile(file);
    }
 
    const onSubmit = async (e: FormEvent) => {
      e.preventDefault()

      if (!email || !password || !username || !file) {
          setError('Veuillez remplir tous les champs !')
          return;
      }

      if (username.length > 20) {
        setError('Votre nom d\'utilisateur ne doit pas dépasser 20 caractères !')
        setTimeout(() => {
            setError('')
        }, 3000);
        return
      }

      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            
            const storageRef = ref(storage, `avatars/${userCredential.user.uid}/avatar.jpg`);

            const uploadTask = uploadBytesResumable(storageRef, file!);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, 
                (error) => {
                    console.log(error.code);
                    setError('Une erreur est survenue !')
                }, 
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        updateProfile(userCredential.user, {
                            displayName: username,
                            photoURL: downloadURL
                        }).then(() => {
                            console.log('User profile updated!');
                        }).catch((error) => {
                            console.log(error.code);
                            setError('Une erreur est survenue !')
                        });

                        await setDoc(doc(db, "users", userCredential.user.uid), {
                            uid: userCredential.user.uid,
                            username: username,
                            email: email,
                            avatar: downloadURL
                        }).then(() => {
                            console.log("Document successfully written!");
                        }).catch((error) => {
                            console.log(error.code);
                            setError('Une erreur est survenue !')
                        });

                        await setDoc(doc(db, "userChats", userCredential.user.uid), {}).then(() => {
                            console.log("Document successfully written!");
                        }).catch((error) => {
                            console.log(error.code);
                            setError('Une erreur est survenue !')
                        });
                    });
                },
            );

            navigate("/login")

        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('Cet email est déjà utilisé !')
                    break;
                case 'auth/invalid-email':
                    setError('Email invalide !')
                    break;
                case 'auth/weak-password':
                    setError('Mot de passe trop faible !')
                    break;
                default:
                    setError('Une erreur est survenue !')
                    break;
            }
        });
 
   
    }
 
  return (
    <main >        
        <section className="bg-gray-50 dark:bg-gray-900 bg-login">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white/10 backdrop-blur-2xl dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Créer un compte
                        </h1>
                        {error && (
                            <div className="alert alert-error alert-dismissible">
                                <div className="flex-1">
                                    <label>{error}</label>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                            <div>
                                <label htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom
                                    d'utilisateur</label>
                                <input type="string" className="input input-bordered w-full max-w-xs" id="username" onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
                            </div>
                            <div>
                                <label htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="string" className="input input-bordered w-full max-w-xs" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <input type="password" className="input input-bordered w-full mb-2" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
                        </div>
                        {/* File avatar input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Avatar
                            </label>
                            <div className="flex items-center mt-2">
                                <input type="file" className="file-input file-input-bordered w-full" onChange={handleFileChange} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">

                            <div className="flex items-start">

                                <div className="ml-3 text-sm">
                                    <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" />
                                    <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-400 cgu-text"> Je
                                        reconnais avoir lu et accepté les
                                        <a href="#"
                                            className="text-primary-600 hover:underline dark:text-primary-500">CGU</a>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full btn btn-lg btn-primary" onClick={onSubmit}>S'inscrire</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            J'ai déjà un compte !
                            <NavLink to="/login" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Se connecter</NavLink>
                        </p>
                        <input type="hidden" name="_csrf_token" value="#" />
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default Signup