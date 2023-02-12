'use strict'

import axios from "axios"

export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,
}

async function getRate(rateInfo) {
    try{
       const rate = await axios.get(`https://blockchain.info/tobtc?currency=${rateInfo.currency}&value=${rateInfo.value}`)
       return rate.data
    }
    catch(err){
        throw new Error('Err', err)
    }
}

async function getMarketPriceHistory(timeSpan) {
    try{
       const pricesHistory = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=${timeSpan}&format=json&cors=true`)
       return pricesHistory.data
    }
    catch(err){
        throw new Error('Err', err)
    }
}
// {
//     x: timestamp
//     y: value in USdollar
// }

async function getAvgBlockSize(timeSpan) {
    try{
       const blockSizeAvgs = await axios.get(`https://api.blockchain.info/charts/avg-block-size?timespan=${timeSpan}&format=json&cors=true`)
       return blockSizeAvgs.data
    }
    catch(err){
        throw new Error('Err', err)
    }
}
// {
//     x: timestamp
//     y: avarege block size in MB
// }
