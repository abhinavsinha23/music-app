import React from "react"
import {useEffect, useRef, useState} from "react"


const RadioPlayer = (props) =>{
    const [res, setRes] = useState()
   
    const videoRef = useRef();
    useEffect(() => {
        if (props.radioURL) {
            setRes(
                <video  className="radioPlayer" ref={videoRef} controls autoPlay>
                    <source src={props.radioURL.url} type="audio/aac" />
                </video>
            );
                  
        }
        
      }, [props.radioURL])

      useEffect(() => {    
        videoRef.current?.load();
    }, [props.radioURL]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = 0.2;
            videoRef.current.play();
          }
    }, [res])

    return (
        <div>
            <p style={{margin:'0px'}}><b>{props?.radioURL?.name}</b></p>
            {res}
        </div>
    )
}

export default RadioPlayer