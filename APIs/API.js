import * as fetch from './fetch.js'

const apiUrl = 'http://ec2-54-180-82-172.ap-northeast-2.compute.amazonaws.com:4000/api/'; 

export const getRiotSummoner = (data)=>{
    const url = `${apiUrl}user/riotSummoner`;
    return fetch.getServer(url,data)
    .then(res=>res.json())
    .then(res=>JSON.parse(res))
    .catch(err => ({err}));
}

export const getRiotLeague = (data)=>{
    const url = `${apiUrl}user/riotLeague`;
    return fetch.getServer(url,data)
    .then(res=>res.json())
    .then(res=>JSON.parse(res))
    .catch(err => ({err}));
}

export const getRiotMatchList = (data)=>{
    const url = `${apiUrl}user/riotMatchlist`;
    return fetch.getServer(url,data)
    .then(res=>res.json())
    .then(res=>JSON.parse(res))
    .catch(err => ({err}));
}

export const getRiotMatch = (data)=>{
    const url = `${apiUrl}match/riotMatches`;
    return fetch.getServer(url,data)
    .then(res=>res.json())
    .then(res=>JSON.parse(res))
    .catch(err => ({err}));
}

export const getLeague = (data)=>{
    const url = `${apiUrl}user/league`;
    return fetch.getServer(url,data)
    .then(res=>res.json())
    .then(res=>JSON.parse(res))
    .catch(err => ({err}));
}   

export const getSummoner = (data)=>{
    const url = `${apiUrl}user/summoner`;
    return fetch.getServer(url,data)
    .then(res=>res.json())
    .then(res=>JSON.parse(res))
    .catch(err => ({err}));
}   

export const getMatchlist = (data)=>{
    const url = `${apiUrl}user/matchlist`;
    return fetch.getServer(url,data)
    .then(res=>res.json())
    .then(res=>JSON.parse(res))
    .catch(err => ({err}));
}   

export const getTeams = (data)=>{
    const url = `${apiUrl}match/matches/teams`;
    return fetch.getServer(url,data)
    .then(res=>res.json())
    .then(res=>JSON.parse(res))
    .catch(err => ({err}));
}

export const getParticipantIdentities = (data)=>{
    const url = `${apiUrl}match/matches/participantIdentities`;
    return fetch.getServer(url,data)
    .then(res=>res.json())
    .then(res=>JSON.parse(res))
    .catch(err => ({err}));
}

export const getParticipants = (data)=>{
    const url = `${apiUrl}match/matches/participants`;
    return fetch.getServer(url,data)
    .then(res=>res.json())
    .then(res=>JSON.parse(res))
    .catch(err => ({err}));
}