import './EditeProfile.css';

import { uploads } from '../../utils/config';

//hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//redux
import { profile, resetMessage, updateProfile } from '../../slices/userSlice';

//components
import Message from '../../components/Message';
import { useFormAction } from 'react-router-dom';

const EditProfile = () => {
    const dispatch = useDispatch()

    const {user, message, error, loading} = useSelector((state) => state.user)

    //states
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bio, setBio] = useState("")
    const [previewImage, setPreviewImage] = useState("")


    //load user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    //fill form with data
    useEffect(() => {

        if(user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
            // setProfileImage(user.profileImage);
        }
    }, [user]);

    console.log(user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //get user data from states
        const userData = {
            name,
        }

        if(profileImage) {
            userData.profileImage = profileImage;
        }
        if(bio) {
            userData.bio = bio;

        }
        if(password) {
            userData.password = password;
        }

        //build form data
        //const formData = new FormData()

        // const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key]))
        // console.log(userFormData)

        // formData.append("user", userFormData)

        // await dispatch(updateProfile(userFormData))

        // build form data
        const userFormData = Object.keys(userData)
          .reduce((formData, key) => {
            formData.append(key, userData[key]);
            return formData;
        }, new FormData());
        
        await dispatch(updateProfile(userFormData));

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }


    const handleFile = (e) => {
        //img preview
        const image = e.target.files[0]

        setPreviewImage(image)

        //update image state
        setProfileImage(image);
    }

  return (
    <div id="edit-profile">
        <h2>Edite seus dados</h2>
        <p className='subtitle'>Adicione uma imagem de perfil e compartilhe o que quiser!</p>
        {/* preview da imagem */}
        {(user.profileImage || previewImage) && (
            <img
            className="profile-image"
             src={
                previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
            } 
            alt={user.name} />
        )}
        <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ""}/>
        <input type='email' placeholder='Email' disabled value={email || ""}/>
        <label>
            <span>Imagem de perfil:</span>
            <input type='file' onChange={handleFile}/>
        </label>
        <label>
            <span>Bio:</span>
            <input type="text" placeholder='Descrição do seu perfil.' onChange={(e) => setBio(e.target.value)} value={bio || ""}/>
        </label>
        <label>
            <span>Quer alterar sua senha? </span>
            <input type='text' placeholder='Nova senha.' onChange={(e) => setPassword(e.target.value)} value={password || ""} />
        </label>
        {!loading && <input type="submit" value="Atualizar"/>}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="sucess" />}
        </form>
    </div>
  )
}

export default EditProfile;