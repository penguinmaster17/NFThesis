import { useEffect, useState } from "react";
import LogoutButton from "./logout.js";
import { useAuth0 } from "@auth0/auth0-react";
import { create } from 'ipfs-http-client'

/* import moralis */
const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = "https://w4jkf92vsqrv.usemoralis.com:2053/server";
const appId = "8SjtJzPNsGUwiLsEUvZv6lPuRILmXl72TDc6vwMl";
const masterKey = "3IezXrkFGiakYtYMzP97mw65xlX6oFawLhIJqmYz";

const options = { chain: 'ropsten', address: '0x5dda91c9EF7AA5103C3F69f06cd46bfE1E2A77c6' };


const GalleryPage = ({backButtonPressed}) => {

    const [myNFTs, setMyNFTs] = useState("");

    const galleryButtonPressed = async () => { 
        await Moralis.start({ serverUrl, appId, masterKey });
        const nfts = await Moralis.Web3API.token.getAllTokenIds(options);
        setMyNFTs(nfts.result)
        console.log("myNFTs", nfts);
    };

    return (
        <div className="GalleryPage">
            <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', height: '50vh', alignItems: 'center', alignContent: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'center', width: '50%'}}>
                    <br></br>
                    <h1 id="title">Gallery</h1>
                </div>
                <button id="galButton" style={{cursor: 'pointer'}} onClick={galleryButtonPressed}>Let's see!</button>
                <div style={{padding: '20px'}}><button id="galButton" style={{cursor: 'pointer'}} onClick={() => {backButtonPressed(false)}}>Go Back</button></div>
                <div style={{color: 'red', margin: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'center', border: '20px', margin: '20px'}}>
                    { Object.entries(myNFTs).map(([key, value]) => {
                        let metadata = JSON.parse(value.metadata);
                        return(
                            <div style={{margin: '5px'}}>
                                <img class={metadata.name}
                                    src={metadata.image}
                                    alt={metadata.description}
                                    width="auto"
                                    height="200vh"
                                    >
                                </img>
                            </div>
                        );
                    })}
                </div>  
            </div>
        </div>
    );  
}

export default GalleryPage;