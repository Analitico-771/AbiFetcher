
import Web3 from 'web3';
import { config } from 'dotenv';
import fetch from 'node-fetch';
   
config();
const web3Provider = process.env.REACT_APP_KOVAN_URL_PROVIDER;
const wssProvider = process.env.REACT_APP_KOVAN_PROVIDER;
const web3 = new Web3(web3Provider);

async function getAbi(tokenAddress) {
    var contractABI = [];
    try{
        const contractAddress = tokenAddress;
        const url = `https://api-kovan.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;
        const response = await fetch(url); //api call for symbol information
        const data = await response.json();
        if (data.message === 'OK') {
            contractABI = JSON.parse(data.result);
            console.log(contractABI)
            
        } else {
            console.log('Error:', response.status);
        }
    }catch(err) {
        console.log(`Error with fetching data. Please try again. ${err}`);
    };
    return contractABI;
};

const tokens = {
    weth: {
        symbol: "WETH",
        address: "0xd0A1E359811322d97991E03f863a0C30C2cF029C"
    },
    dai: {
        symbol: "DAI",
        address: "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"
    }
}

getAbi(tokens.dai.address);