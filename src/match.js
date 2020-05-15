import * as API from '../APIs/API.js';
import metaData from './singleton.js'


export const match = async(match,accountId)=>{
    const {timestamp, gameId} = match;
    const matchRes = await API.getRiotMatch({gameId});
    console.log(matchRes);
    const {gameCreation, gameDuration, teams, participantIdentities, participants} = matchRes;
    const champDic = metaData.championList;
    const spellDic = metaData.spellList;

    var date = new Date(timestamp);
    var $div = document.createElement('div');
    $div.className = 'block';

    var $queue = document.createElement('div');
    $queue.innerHTML = '<b>솔랭<b/>';
    $queue.style.marginBottom = '3px';
    var $datetime = document.createElement('div');
    $datetime.innerHTML = date.toLocaleDateString();
    $datetime.style.marginBottom = '7px';
    var $blockLeft = document.createElement('div');
    var $duration = document.createElement('div');
    $duration.innerHTML = `${parseInt(gameDuration/60)}분 ${gameDuration%60}초`;
    
    $blockLeft.className = 'block_left';
    $blockLeft.appendChild($queue);
    $blockLeft.appendChild($datetime);
    
    var $statsBox = document.createElement('div');
    $statsBox.className = 'stats_box'; 
    var $statsBoxUp = document.createElement('div');
    $statsBoxUp.className = 'stats_box_up';
    var $statsBoxDown = document.createElement('div');
    $statsBoxDown.className = 'stats_box_down';
    var $championProfile = document.createElement('img');
    $championProfile.style.borderRadius = '70px';
    $championProfile.style.width = '50px';
    $championProfile.style.height = '50px';

    var participantId = 0;
 
    participantIdentities.map((v,i)=>{
        if(v.player.accountId  == accountId){
            participantId = v.participantId;
            const {championId, teamId} = participants[participantId-1];
            $championProfile.src = `https://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/${champDic[championId].id}.png`;
            $statsBoxDown.innerHTML = champDic[championId].name;
            const isWin =  teams[(teamId-100)/100].win;
            $div.style.backgroundColor = isWin == "Win" ? '#a3cfec' : '#e2b6b3';
            var $isWin = document.createElement('div');
            $isWin.innerHTML = isWin == "Win" ? "승리" : "패배"
            $isWin.style.marginBottom = '3px';
            $isWin.style.color = isWin == "Win" ? '#1a78ae' : '#c6443e';
            $blockLeft.appendChild($isWin);
        }
    });    

    const {spell1Id,spell2Id,stats:{assists,item0,item1,item2,item3,item4,item5,item6}} = participants[participantId-1];

    $statsBoxUp.appendChild($championProfile);
    $statsBox.appendChild($statsBoxUp);
    $statsBox.appendChild($statsBoxDown);
    $blockLeft.appendChild($duration);
    $div.appendChild($blockLeft);
    $div.appendChild($statsBox);
    return $div;
}