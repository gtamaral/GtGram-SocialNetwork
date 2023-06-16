//css
import './Search.css';

//hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';
import { useQuery } from '../../hooks/useQuery';


//components
import LikeContainer from '../../components/LikeContainer';
import PhotoItem from '../../components/PhotoItem';
import { Link } from 'react-router-dom';

//redux
import { searchPhotos, like } from '../../slices/photoSlice';




const Search = () => {
    const query = useQuery();
    const search  = query.get("q");

    const dispatch = useDispatch()

    const resetMessage = useResetComponentMessage(dispatch)

    const {user} = useSelector(state => state.auth)
    const {photos, loading} = useSelector(state => state.photo)

    //load photos
    useEffect(() => {
        dispatch(searchPhotos(search))

        resetMessage();
    }, [ dispatch, search])

    //like a photo
    const handleLike = (photo) => {

        dispatch(like(photo._id));

      resetMessage();
    }

    if (loading) {
        return <p>Carregando...</p>
    }

  return (
    <div className="search">
        <h2>Você está buscando por: {search}</h2>
        {photos && photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
          </div>  
        ))}
        {photos && photos.length === 0 && (
            <h2 className="no-photos">
                Não foram encontrados resultados com essa busca... tente outra vez!
            </h2>  
          )}          
        
    </div>
  )
}

export default Search