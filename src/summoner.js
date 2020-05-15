import * as API from '../APIs/API.js';
import {match} from './match.js';

const form = document.querySelector(".requestSummoner"),
    input = form.querySelector("input");

const summoner = document.querySelector(".summoner");
const league = document.querySelector(".league"),
    head = league.querySelector(".league_head"),
    tierRank = league.querySelector(".league_tierRank"),
    league_info = league.querySelector(".league_info"),
    winRate = league.querySelector(".league_winRate");
const leagueProfile = document.querySelector(".league_profile");
const $table = document.querySelector(".table");

const handleSubmit = async(e) =>{
    e.preventDefault();
    const summonerName = input.value;
    location.href=`./summoner.html?summonerName=${summonerName}`;
}

const init = async() =>{
    form.addEventListener("submit",handleSubmit);
    let params = location.search.substr(location.search.indexOf("?") + 1);
    const summonerName = decodeURI(params.split("=")[1]);

    const summonerRes = await API.getRiotSummoner({summonerName});
    const {name,summonerLevel,accountId, id} = summonerRes;
    const leagueRes = await API.getRiotLeague({id});
    if(summonerRes == null){
        summoner.innerHTML = "등록된 유저가 없습니다."
        head.innerHTML = "소환사 이름을 확인해 주세요."
        return;
    }
    var idx = 0;
    for (var i = 0; i< leagueRes.length; i++){
        if(leagueRes[i].queueType == 'RANKED_SOLO_5x5')idx = i
    }
    const {tier,rank,leaguePoints,wins,losses} = leagueRes[idx];
    const matchListRes = await API.getRiotMatchList(
        {accountId, queue : 420, season : 13, beginIndex : 0, endIndex : 10});
    
    var num = 1;
    switch(rank){
        case "I" : num = 1; break;
        case "II" : num = 2; break;
        case "III" : num = 3; break;
        case "IV" : num = 4; break;
    }
    leagueProfile.src = `https://opgg-static.akamaized.net/images/medals/${tier.toLowerCase()}_${num}.png`;

    head.innerHTML = "솔로랭크";
    summoner.innerHTML = `${name} ${summonerLevel}레벨`
    tierRank.innerHTML = `<b>${tier} ${rank}</b>`;
    league_info.innerHTML = `<b>${leaguePoints}LP</b> / ${wins}승 ${losses}패`;
    winRate.innerHTML = `승률 ${parseInt(wins/(wins+losses) * 100)}%`;

    var matches = matchListRes.matches;
    matches = await matches.sort((a,b)=>a.timestamp > b.timestamp ? -1 : 1);

    matches.map(async(v,i)=>{
        const $div = await match(v,accountId);
        $table.appendChild($div);
    })
}

init();