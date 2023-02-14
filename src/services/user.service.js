

import { utilService } from '@/services/util.service.js'

// const users = [
//     {
//         name: "Maor Aknin",
//         balance: 100,
//         transactions: []
//     },
//     {
//         name: "Noa Shauli",
//         balance: 100,
//         transactions: []
//     },
//     {
//         name: "Adi Gabay",
//         balance: 100,
//         transactions: []
//     }
// ]


import { dbService } from './db.service.js'
const USER_KEY = 'users'
const LOGEDIN_USER = 'logedin_user'

export const userService = {
    // query,
    // getUser,
    // remove,
    login,
    signup,
    getLogedUser
    // getLoginToken,
    // signupTest
}


// function query(filterBy) {
//     let filteredUsers = users
//     return Promise.resolve(filteredUsers)
// }

// function getUser(userId) {
//     const user = users.find(user => user._id === userId)
//     if (!user) return Promise.reject('User not found')
//     return Promise.resolve(user)
// }

// function remove(userId) {
//     const idx = users.findIndex(user => user._id === userId)
//     if (idx === -1) return Promise.reject('No such user')
//     users.splice(idx, 1)
// }

async function signup(name, password ) {
    localStorage.logedin_user = []
    const user = []
    const users = await dbService.query()
    if (!users) {
        users = []
    }
    const userToSave = {
        _id: utilService.makeId(),
        name,
        password,
        balance: 100,
        transactions: []
    }
    try {
        users.unshift(userToSave)
        user.unshift(userToSave)
        await dbService.insert(USER_KEY, users)
        await dbService.insert(LOGEDIN_USER, user)
    }
    catch (err) {
        console.log('Error', err, err.massage)
    }
    return userToSave
}


async function login(name, password) {
    localStorage.logedin_user = []
    const users = await dbService.query(USER_KEY)
    const user = users.filter(u => u.name === name)
    if (!user.length) return Promise.reject('Login failed')
    await dbService.insert(LOGEDIN_USER, user)
    return Promise.resolve(user)

}

async function getLogedUser() {
    const logedin = await dbService.getLogedInUser(LOGEDIN_USER)
    return logedin[0]
    }