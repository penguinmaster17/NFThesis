import LoginButton from "./login"

const LandingPage = () => {
    return (
        <div className="Minter">
        
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', height: '50vh', alignItems: 'center', alignContent: 'center'}}>
    
    <div style={{display: 'flex', justifyContent: 'center', width: '50%'}}>
    <LoginButton />
    <br />
    </div>
    <div style={{color: 'red', margin: '20px' }}>You must log in with your Princeton email address! 🐯</div>  
    </div>
        </div>
    );  
}

export default LandingPage;