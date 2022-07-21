import { getUrl } from "../apis/api";
import React, { useState } from "react";

const RedirectPage =  () => {

    const [longUrl, setLongUrl] = useState("");
    // const [location,setLocation] = useState("");


    const getLink = async (stringUrl) => {
        var vlongUrl= await getUrl({stringUrl});
        if(vlongUrl){
            setLongUrl(vlongUrl);
        }
    };


    var stringUrl= window.location.pathname ;
    if(stringUrl.length!==0){
        stringUrl = stringUrl.substring(1);
        getLink(stringUrl);
    }else{
        window.location.replace('http://localhost:3000/app');                   // Go to not found page
        return null;
    }


    if(longUrl=== "NOT FOUND"){
        window.location.replace('http://localhost:3000/notfound');              // Go to not found page
        return null;
    }
    // else{
    //     window.location.replace(longUrl);
    //     return null;
    // }


    return (
        <h5>Redirect to <a href= {longUrl} > {longUrl} </a> </h5>
    );

}

export default RedirectPage;