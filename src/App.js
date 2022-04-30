import './App.css';
import Minter from './Minter';
import LandingPage from './landingpage';
import GalleryPage from './gallerypage';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
    <div style={{display: 'flex', justifyContent: 'center', height: '50vh', alignItems: 'center', alignContent: 'center'}}>
    <div style={{display: 'flex', justifyContent: 'center', width: '50%'}}>
      <div><b>Loading ...</b></div>
    </div>
    </div>
    );
  }

  if (!isAuthenticated) {
  return (
    <div className="App">
      <LandingPage></LandingPage>
    </div>
  );
  }

  if(isGallery){
    return (
      <div className="App">
        <GalleryPage></GalleryPage>
      </div>
    )
  };

  return (

    <div className="App">
      <Minter></Minter>
    </div>
  );


}

export default App;
