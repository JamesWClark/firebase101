import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { db, auth, storage } from './config/Firebase';
import { addDoc, getDocs, collection, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {

  const[movieList, setMovieList] = useState([]);

  // new movie states
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState(0);
  const [oscar, setOscar] = useState(false);

  // update title state
  const [newTitle, setNewTitle] = useState('');

  // file upload state
  const [file, setFile] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  const getMovies = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      //setMovieList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      
      console.log(filteredData);
      setMovieList(filteredData);
    } catch(err) {
      console.error(err);
    }
  }

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovies();
    } catch(err) {
      console.error(err);
    }
  }

  const updateMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {title: newTitle} );
      getMovies();
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  const onSubmitMovie = async () => { 
    try {
      await addDoc(moviesCollectionRef, {
        title,
        releaseDate,
        receivedAnOscar: oscar,
        userId: auth?.currentUser?.uid
      });

      getMovies();

      setTitle('');
      setReleaseDate(0);
      setOscar(false);
    } catch(err) {
      console.error(err);
    }
  }

  const uploadFile = async () => {
    if(!file) return console.log('No file selected');

    const filesFolderRef = ref(storage, `projectFiles/${file.name}`);

    try {
      await uploadBytes(filesFolderRef, file);
      console.log('File uploaded successfully');
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className='main'>
      <Auth />

      <div>
        <input 
          placeholder='Movie title...' 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          placeholder='Release date...' 
          type="number"
          onChange={(e) => setReleaseDate(Number(e.target.value))} 
        />
        <input id="oscarcb" type="checkbox" checked={oscar} onChange={(e) => setOscar(e.target.checked)} />
        <label htmlFor="oscarcb">Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Date: {movie.releaseDate}</p>
            {movie.receivedAnOscar && <p>Received an Oscar</p>}
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            <input placeholder='New title...' onChange={(e) => { setNewTitle(e.target.value); console.log(newTitle); }} />
            <button onClick={() => { console.log('update movie id ', movie.id); updateMovie(movie.id)}}>Update Title</button>
          </div>
        ))}
        
        <div>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={uploadFile}>Upload File</button>
        </div>

      </div>
    </div>
  )
}

export default App;
