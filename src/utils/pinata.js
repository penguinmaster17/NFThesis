//for local use
// require('dotenv').config();
const { key } = require("0b63027fceccddff0fcc");
const { secret } = require("a9555fb1f20829995d02f7e9db003a2294056f6c0531c701811a1f38785fc58d");

const axios = require('axios');

// takes JSONBody as input and the Pinata api key and secret in its header
// makes POST request to pinJSONToIPFS API
export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};