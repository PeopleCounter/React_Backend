
function Home()
{
    let ok=true;
    return(
        <>

            {!sessionStorage.getItem("csrf")?window.location="/authenticate":ok}
            
        
        
        </>
    )
}

export default Home