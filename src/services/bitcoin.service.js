'use strict'

import axios from "axios"
import { storageService } from "./storage.service.js"

export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,
}

async function getRate() {
    let rate = storageService.load('rate')
    if (rate) return rate
    try {
        rate = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true`)
        console.log('rate:', rate)
        storageService.save('rate', rate.data)
        return rate.data
    }
    catch (err) {
        throw new Error('Err', err)
    }
}

async function getMarketPriceHistory() {
    let pricesHistory = storageService.load('prices-history')
    if(pricesHistory) return pricesHistory
    try {
        pricesHistory = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true`)
        storageService.save('prices-history', pricesHistory.data.values)
        return pricesHistory.data.values
    }
    catch (err) {
        throw new Error('Err', err)
    }
}


async function getAvgBlockSize() {
    let blockSizeAvgs = storageService.load('block-size-avgs')
    if(blockSizeAvgs) return blockSizeAvgs
    try {
        blockSizeAvgs = await axios.get(`https://api.blockchain.info/charts/avg-block-size?timespan=1months&format=json&cors=true`)
        storageService.save('block-size-avgs', blockSizeAvgs.data.values)
        return blockSizeAvgs.data.values
    }
    catch (err) {
        throw new Error('Err', err)
    }
}

