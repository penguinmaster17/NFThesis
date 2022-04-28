import LoginButton from "./login"

const LandingPage = () => {
    return (
        <div className="Minter">
        <div style={{display: 'flex', justifyContent: 'center', height: '50vh', alignItems: 'center', alignContent: 'center'}}>
    <div style={{display: 'flex', justifyContent: 'center', width: '50%'}}>
    <LoginButton />
    </div>
    </div>
            
        </div>
    );  
}

export default LandingPage;