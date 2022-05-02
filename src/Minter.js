// adapted from https://docs.alchemy.com/alchemy/tutorials/nft-minter 
import { useEffect, useState } from "react";


import { 
  connectWallet,
  getCurrentWalletConnected,
  mintNFT
} from "./utils/interact.js";
import LogoutButton from "./logout.js";
import { useAuth0 } from "@auth0/auth0-react";
import { create } from 'ipfs-http-client'
import GalleryPage from "./gallerypage.js";


const Minter = (props) => {

  //State variables
  // walletAddress = a string that stores the user's wallet address
  // status = a string that contains a message to display at the bottom of the UI
  // name = a string that stores the NFT's name
  // description = a string that stores the NFT's description
  // url = a string that is a link to the NFT's digital asset
  // Auth0 components for personalisation of the page
  const [walletAddress, setWallet] = useState("");
  const [onGallery, setOnGallery] = useState(false);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [image, setImage] = useState("");
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  const client = create('https://ipfs.infura.io:5001/api/v0')
  
 
  useEffect(async () => { 
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);
  }, []);

  const connectWalletPressed = async () => { 
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    console.log("url from onMintPressed", url);
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };

  const onUploadPressed = async (event) => {
    const file = event.target.files[0]
    try {
      const added = await client.add(file)
      const uploadUrl = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log("uploadUrl", uploadUrl);
      setURL(uploadUrl);
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  const galleryButtonPressed = (e) => {
    setOnGallery(true);
  }

  const backButtonPressed = (e) => {
    setOnGallery(e);
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          // if window.ethereum not enabled, prompt metamask installation
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  

  return (
    <>
    {!onGallery &&
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <LogoutButton />
      

      <br></br>
      <h1 id="title">NFThesis</h1>
      <p>Welcome Back, {user.email}!</p>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>Upload Image: </h2>
        <input 
          type="file"
          accept="image/png, image/jpeg"
          onChange={(event) => onUploadPressed(event)}
        />
        <h2>Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>Description: </h2>
        <input
          type="text"
          placeholder="e.g. My Senior Thesis Project!"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
      <div style={{display: 'flex', justifyContent: 'center', padding: '20px'}}><button id="walletButton" onClick={galleryButtonPressed}>
      <span>Click Here to View NFThesis Gallery</span>
      </button></div>
    </div> }
    {onGallery && <GalleryPage backButtonPressed={backButtonPressed} />}
    </>
  );
};

export default Minter;
