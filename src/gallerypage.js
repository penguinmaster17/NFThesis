import { useEffect, useState } from "react";
import LogoutButton from "./logout.js";
import { useAuth0 } from "@auth0/auth0-react";
import { create } from 'ipfs-http-client'

const GalleryPage = () => {
    return (
        <div className="Minter">
        
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', height: '50vh', alignItems: 'center', alignContent: 'center'}}>
    
    <div style={{display: 'flex', justifyContent: 'center', width: '50%'}}>
    <LogoutButton />
    <br></br>
      <h1 id="title">Gallery</h1>
    </div>
    <div style={{color: 'red', margin: '20px' }}>Content coming soon ...!</div>  
    </div>
        </div>
    );  
}

export default GalleryPage;