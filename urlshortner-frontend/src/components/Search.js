import React, { useState } from "react";
import { Button, TextField, LinearProgress } from "@material-ui/core";
import styled from "styled-components";

import validator from "validator";

import {getUrl, setUrl} from "../apis/api";
import DisplayLink from "./DisplayLink";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

let options = {                                   // Options parameter for validator 
  protocols: [
      'http',
      'https'
  ],
  // require_tld: true,
  require_protocol: true
  // require_host: true,
  // require_valid_protocol: true,
  // allow_underscores: false,
  // host_whitelist: false,
  // host_blacklist: false,
  // allow_trailing_dot: false,
  // allow_protocol_relative_urls: false,
  // disallow_auth: false
}

var rootPage= 'localhost:3000';
if(process.env.NODE_ENV === "production"){
  rootPage = process.env.homepage;
}

const Search = () => {
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");
  const [loading, setLoading] = useState(false);

  // onSubmit button listner
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkLink(link)) {
      getLink(link);
      setLink("");
      setLoading(!loading);
    }
  };

  // url validator
  const checkLink = (string) => {
    if (!validator.isURL(string,options)) {
      setShort("");
    }

    return validator.isURL(string,options);
  };

  // API call to get link
  const getLink = async (stringUrl) => {
    var shortUrl= await setUrl({stringUrl});
    console.log(await getUrl({shortUrl}));
    if(shortUrl){
        setShort(rootPage+'/'+shortUrl);
        setLoading(false);
    }
  };

  return (
    <>
      <StyledForm onSubmit={(e) => handleSubmit(e)} autoComplete="off">
        <TextField
          style={{ marginBottom: "20px" }}
          label=" Enter a long URL  "
          variant="outlined"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        {!loading && (
          <Button
            style={{
              borderRadius: 20,
            }}
            onClick={(e) => handleSubmit(e)}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        )}

        {loading && <LinearProgress />}
      </StyledForm>

      {short ? (
        <>
          <h4 style={{ color: "green" }}> Short Link: </h4>

          <DisplayLink shortend={`${short}`} />

          <Button
            style={{
              borderRadius: 20,
              marginTop: "20px",
              color: "white",
              backgroundColor: "green",
            }}
            onClick={() => {
              navigator.clipboard.writeText(short);
            }}
            variant="contained"
          >
            Copy to Clipboard
          </Button>
        </>
      ) : (
        <>
          <h4 style={{ color: "red" }}>Enter a valid Link with protocol</h4>
        </>
      )}
    </>
  );
};

export default Search;
