/* eslint-disable no-unused-vars */
import '../css/Home.css'

import PropTypes from 'prop-types';

function Home(props)
{
    let count = false;
    

    return(
        <>
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

            <div className="container">
                <div className="container1 total-entries">
                    <div className="header" style={{display:'flex',justifyContent:"center",fontSize:"25px",marginTop:"10px"}}>
                        Entries
                    </div>

                    <div className="icon-grid">
                        <div className="icon" style={{display:'flex',alignItems:'center',marginBottom:"65px"}}>
                            <i className="fa-solid fa-right-to-bracket" style={{fontSize:"65px",marginLeft:"7%"}}></i>
                            
                        </div>
                        <div className="text" style={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:"30px",marginBottom:"65px"}}>
                            <h1>{props.counts.in}</h1>
                        </div>
                    </div>
                </div>

                <div className="container1 total-exit">
                <div className="header" style={{display:'flex',justifyContent:"center",fontSize:"25px",marginTop:"10px"}}>
                        Exits
                    </div>

                    <div className="icon-grid">
                        <div className="icon" style={{display:'flex',alignItems:'center',marginBottom:"65px"}}>
                            <i className="fa-solid fa-right-from-bracket" style={{fontSize:"65px",marginLeft:"7%"}}></i>
                        </div>
                        <div className="text" style={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:"30px",marginBottom:"65px"}}>
                            <h1>{props.counts.out}</h1>
                        </div>
                    </div>

                </div>

                <div className="container1 occupancy-ratio">
                <div className="header" style={{display:'flex',justifyContent:"center",fontSize:"25px",marginTop:"10px"}}>
                        Occupancy Ratio
                    </div>

                    <div className="icon-grid">
                        <div className="icon" style={{display:'flex',alignItems:'center',marginBottom:"65px"}}>
                            <i className="fa-solid fa-percent" style={{fontSize:"65px",marginLeft:"7%"}}></i>
                        </div>
                        <div className="text" style={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:"30px",marginBottom:"65px"}}>
                            <h1>386</h1>
                        </div>
                    </div>

                </div>

                <div className="container1 student-entry">
                <div className="header" style={{display:'flex',justifyContent:"center",fontSize:"25px",marginTop:"10px"}}>
                        Student Entry
                    </div>

                    <div className="icon-grid">
                        <div className="icon" style={{display:'flex',alignItems:'center',marginBottom:"65px"}}>
                            <i className="fa-solid fa-book-open-reader" style={{fontSize:"65px",marginLeft:"7%"}}></i>
                        </div>
                        <div className="text" style={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:"30px",marginBottom:"65px"}}>
                            <h1>386</h1>
                        </div>
                    </div>

                </div>

                <div className="container1 faculty-entry">
                <div className="header" style={{display:'flex',justifyContent:"center",fontSize:"25px",marginTop:"10px"}}>
                        Faculty Entry
                    </div>

                    <div className="icon-grid">
                        <div className="icon" style={{display:'flex',alignItems:'center',marginBottom:"65px"}}>
                            <i className="fas fa-chalkboard-teacher" style={{fontSize:"65px",marginLeft:"7%"}}></i>
                        </div>
                        <div className="text" style={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:"30px",marginBottom:"65px"}}>
                            <h1>386</h1>
                        </div>
                    </div>

                </div>

                <div className="container1 unknown-entry">
                <div className="header" style={{display:'flex',justifyContent:"center",fontSize:"25px",marginTop:"10px"}}>
                        Unknown Entry
                    </div>

                    <div className="icon-grid">
                        <div className="icon" style={{display:'flex',alignItems:'center',marginBottom:"65px"}}>
                            <i className="fa-solid fa-user" style={{fontSize:"65px",marginLeft:"7%"}}></i>
                        </div>
                        <div className="text" style={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:"30px",marginBottom:"65px"}}>
                            <h1>386</h1>
                        </div>
                    </div>

                </div>
                
            </div>

            <div className="bottom">

                    <div className="busiest-hour">

                    </div>
                    <div className="busiesthour">

                    </div>
            </div>

            <div className="button">
                <button>View Graphs</button>
            </div>
            
            
        
        
        </>
    )
}

Home.propTypes = {
    counts : PropTypes.object
}
export default Home
