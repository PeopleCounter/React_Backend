/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../css/Home.css'
import * as d3 from 'd3'
import PropTypes from 'prop-types';

function Home(props)
{
    let count = false;
    
    useEffect(()=>{
        let padding = 50
        async function getDate(){
        let new_res = []
        let result = await fetch('http://localhost:3000/dates/getDates',{
            headers:{"Content-Type":"application/json"},
            method:"GET",
        }).then(async(result)=>{
                    return await result.json()
                }
            )

        result.result.forEach((element)=>{
            new_res.push({Day:element.date,in:element.in})
        })
        let height = document.getElementById("graphs").clientHeight
        let width = document.getElementById("graphs").clientWidth
        if (!d3.select("#svg").size()) {
            d3.select("#graphs")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .attr("id", "svg");
          }
        
        const XScale = d3.scalePoint().domain(new_res.map((element)=>element.Day))
        .range([(0+padding),(width-padding)])
        console.log(XScale("Saturday"),XScale("Friday"))
        
        const YScale = d3.scaleLinear().domain([0,d3.max(new_res,function(d){
            return d.in
        })]).range([(height-padding),(0+padding)])

        

        const line = d3.line().x((d)=> XScale(d.Day)).y((d)=>YScale(d.in)).curve(d3.curveMonotoneX)
        let path_graph = line(new_res)
        if(!d3.select("#path").size()){
            let xAxis = d3.axisBottom(XScale)
            let yAxis = d3.axisLeft(YScale)
        d3.select("#svg")
        .append("path").attr("id","path").attr("d",`${path_graph}`).attr("stroke","red").attr("stroke-width","5").attr("fill","none")
        d3.select("#svg").append("g").attr("transform",`translate(0,${height-20})`).attr("id","xaxis").call(xAxis)
        d3.select("#svg").append("g").attr("transform",`translate(${40},0)`). attr("id","yaxis").call(yAxis)

        
        }


    }
    getDate()
    
    },[])

    return(
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <div className="home">
                <div className="cards">
                
                    <div className="card">
                        <div className="cell-card in">
                            <div className="info1">   
                                <div className="image1"><i className="fa-solid fa-right-to-bracket" style={{fontSize:"50px",marginLeft:"19%"}}></i></div>
                                <div className="data">
                                    <b style={{fontSize:"30px"}}>{props.counts.in}</b>
                                </div>
                            </div>

                            <div className="label1">
                                Total Entries
                            </div>

                        </div>
                        <div className="cell-card out">
                                <div className="info1">
                                    <div className="image1"><i className="fa-solid fa-right-from-bracket" style={{fontSize:"50px",marginLeft:"19%"}}></i></div>
                                    <div className="data">
                                        <b style={{fontSize:"30px"}}>{props.counts.out}</b>
                                    </div>
                                </div>
                                <div className="label1">
                                    Total Entries
                                </div>
                        </div>
                        <div className="cell-card occupancy-ratio">
                            <div className="info1">
                                <div className="image1"><i className="fa-solid fa-percent" style={{fontSize:"50px",marginLeft:"19%"}}></i></div>
                                <div className="data">
                                    <b style={{fontSize:"30px"}}>{props.counts.out}</b>
                                </div>
                        
                            </div>

                            <div className="label1">
                                Occupancy Ratio
                            </div>
                        </div>
                        <div className="cell-card todo"></div>
                    </div>
                    <div className="card">
                    <div className="cell-card in">
                        <div className="info1">
                            <div className="image1"><i className="fa-solid fa-book-open-reader" style={{fontSize:"50px",marginLeft:"19%"}}></i></div>
                            <div className="data">
                                <b style={{fontSize:"30px"}}>{props.counts.out}</b>
                            </div>
                        </div>
                        <div className="label1">
                            Student Entries
                        </div>
                    </div>
                        <div className="cell-card out">
                            <div className="info1">
                                    <div className="image1"><i className="fas fa-chalkboard-teacher" style={{fontSize:"50px",marginLeft:"19%"}}></i></div>
                                    <div className="data">
                                        <b style={{fontSize:"30px"}}>{props.counts.out}</b>
                                    </div>
                            </div>
                            <div className="label1">
                                Faculty Entry
                            </div>
                        </div>
                        <div className="cell-card occupancy-ratio">
                            <div className="info1">
                                <div className="image1"><i className="fa-solid fa-user" style={{fontSize:"50px",marginLeft:"19%"}}></i></div>
                                    <div className="data">
                                        <b style={{fontSize:"30px"}}>{props.counts.out}</b>
                                    </div>
                            </div>

                            <div className="label1">
                                Unknown Entries
                            </div>
                        </div>
                        <div className="cell-card todo"></div>
                    </div>

                    <div className="busy" style={{color:"#fff"}}>
                        <div className="title">
                            <p >Busiest Hour </p>
                        </div>
                        <div className="graph" style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'50px'}}>
                        <i className="fa-solid fa-clock"></i>
                        </div>
                        <div className="hour">
                            <p>10:00 AM</p>
                        </div>
                    </div>
                    <div className="busy2" style={{color:"#fff"}}>
                    <div className="title">
                            <p >Busiest Day </p>
                        </div>
                        
                        <div className="graph" style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'50px'}}>
                            <i className="fa-solid fa-calendar-days"></i> 
                        </div>

                        <div className="hour">
                            <p>Thursday</p>
                        </div>
                    </div>
                              
                </div>
                <div className="graphs" id="graphs"></div>

            </div>
    
        
        </>
    )
}

Home.propTypes = {
    counts : PropTypes.object,
    counts_face : PropTypes.object
}
export default Home
