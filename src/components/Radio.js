import React from "react"
import { useState, useRef, useEffect } from "react"
import playIcon from "../Image/118620_play_icon.svg"
import linkIcon from "../Image/external_link_font_awesome.svg"
import radioIconPlaceholder from "../Image/radio_icon_placeholder.png"
import { getRadioData } from "../utils"





const Radio = () => {

    const [searchVal, setSearchVal] = useState("")
    const [radioData, setRadioData] = useState([])
    const [link, setLink] = useState()
    const [res, setRes] = useState()
    
    const getRadios = async (event) => {
        event.preventDefault()
        setRadioData( await getRadioData(searchVal))
    }
    
    const videoRef = useRef();

    useEffect(() => {    
                videoRef.current?.load();
            }, [link]);

    const playRadio = (url) => {
        setLink(url);
    
        if (url) {
            setRes(
                <video style={{position:'sticky'}} ref={videoRef} controls autoPlay>
                    <source src={url} type="audio/aac" />
                    
                </video>
            );
        }
    };

    



    return ( 
        
        <div style={{height: '100%'}}>
            <form onSubmit={getRadios}>
                <label> <input className="radioInput" value={searchVal} onChange={(event) => setSearchVal(event.target.value)} placeholder="Search radio stations" required/></label>
                <button type="submit">Search</button>
                
            </form>
            {res}
            <div className="radioWrap">
            {radioData.map((station, index) => {
                return(
                    <div key={index} className="eachRadioWrap">
                        <div className="radioImgDiv">
                            <img alt="Station logo" className="radioImg" src={station.favicon ? station.favicon : radioIconPlaceholder } />
                        </div>
                        <div className="radioNameWrap">
                            <h2 className="radioName"><a style={{color: 'white', textDecoration:'none'}} href={station.homepage}>{station.name}</a></h2>
                            {!station.url_resolved.includes("m3u8") ? <img alt="play Icon" className="playIcon" onClick={(event) => playRadio(station.url_resolved)} src={playIcon} /> : <a className="playIcon" href={station.homepage}><img  src={linkIcon} alt="link Icon"/></a>}
                            
                    </div>
                </div>      
                )
            })}
            </div>
        </div>
    )


}

export default Radio