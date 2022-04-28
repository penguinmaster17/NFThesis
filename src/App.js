import './App.css';
import Minter from './Minter';
import LandingPage from './landingpage';
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
  return (
    <div className="App">
      <LandingPage></LandingPage>
    </div>
  );
  }

  return (
    <div className="App">
      <Minter></Minter>
    </div>
  );

}

export default App;
