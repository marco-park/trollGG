import * as API from '../APIs/API.js';
import metaData from './singleton.js'

export const match = async(match,accountId)=>{
    const {timestamp, gameId} = match;
    const matchRes = await API.getRiotMatch({gameId});
    const {gameCreation, gameDuration, teams, participantIdentities, participants} = matchRes;
    const champDic = metaData.championList;
    const spellDic = metaData.spellList;

    console.log(matchRes);

    var date = new Date(gameCreation);
    var $div = document.createElement('div');
    var $queue = document.createElement('div');
    var $datetime = document.createElement('div');
    var $bar = document.createElement('div');
    var $blockLeft = document.createElement('div');
    var $duration = document.createElement('div');

    $div.className = 'block';
    $queue.innerHTML = '<b>솔랭<b/>';
    $datetime.innerHTML = date.toLocaleDateString();
    $bar.innerHTML = '-';
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
    var $championProfilediv = document.createElement('div');
    var $championProfile = document.createElement('img');
    var $spellProfile = document.createElement('div');
    $spellProfile.className = 'spell_profile';
    var $spell1Profile = document.createElement('img');
    var $spell1Profilediv = document.createElement('div');
    var $spell2Profile = document.createElement('img');
    var $spell2Profilediv = document.createElement('div');

    var $kdaBox = document.createElement('div');
    $kdaBox.className = 'kda_box';
    var $kills = document.createElement('span');
    var $deaths = document.createElement('span');
    var $assists = document.createElement('span');
    var $kdaRatio = document.createElement('div');

    $queue.style.marginBottom = '3px';
    $datetime.style.marginBottom = '7px';
    $bar.style.lineHeight = '16px';
    $bar.style.color = '#555';
    $spellProfile.style.marginLeft = '5px';
    $championProfile.style.borderRadius = '70px';
    $championProfile.style.width = '50px';
    $championProfile.style.height = '50px';
    $spell1Profile.style.width = '25px';
    $spell1Profile.style.height = '25px';
    $spell2Profile.style.width = '25px';
    $spell2Profile.style.height = '25px';
    $deaths.style.color = '#c6443e';
    $kdaRatio.style.fontSize = '12px';
    $kdaRatio.style.marginTop = '5px';

    var participantId = 0;
    const url = `https://ddragon.leagueoflegends.com/cdn/10.9.1/img/`;
 
    participantIdentities.map((v,i)=>{
        if(v.player.accountId  == accountId){
            participantId = v.participantId;
            const {championId, teamId} = participants[participantId-1];
            $championProfile.src = `${url}champion/${champDic[championId].id}.png`;
            $statsBoxDown.innerHTML = champDic[championId].name;
            const isWin =  teams[(teamId-100)/100].win;
            $div.style.backgroundColor = gameDuration < 600 ? "rgb(176,176,176)" : isWin == "Win" ? '#a3cfec' : '#e2b6b3';
            var $isWin = document.createElement('div');
            $isWin.innerHTML = gameDuration < 600 ? "다시하기" : isWin == "Win" ? "승리" : "패배"
            $isWin.style.marginBottom = '3px';
            $isWin.style.color = gameDuration < 600 ? "#000" : isWin == "Win" ? '#1a78ae' : '#c6443e';
            $blockLeft.appendChild($bar);
            $blockLeft.appendChild($isWin);
        }
    });    

    const {spell1Id,spell2Id,stats:{kills,assists,deaths,item0,item1,item2,item3,item4,item5,item6}} = 
        participants[participantId-1];

    $kills.innerHTML = kills + '    /   ';
    $deaths.innerHTML = deaths;
    $assists.innerHTML = '  /   ' +  assists;
    $kdaRatio.innerHTML = `<b>${((kills+assists)/Math.max(1,deaths)).toFixed(2)}</b> 평점`;
    $kdaBox.append($kills);
    $kdaBox.append($deaths);
    $kdaBox.append($assists);
    $kdaBox.append($kdaRatio);

    $championProfilediv.appendChild($championProfile);
    $spell1Profile.src = `${url}spell/${spellDic[spell1Id].id}.png`
    $spell2Profile.src = `${url}spell/${spellDic[spell2Id].id}.png`
    $spell1Profilediv.appendChild($spell1Profile);
    $spell2Profilediv.appendChild($spell2Profile);
    $spellProfile.appendChild($spell1Profilediv);
    $spellProfile.appendChild($spell2Profilediv);

    $statsBoxUp.appendChild($championProfilediv);
    $statsBoxUp.appendChild($spellProfile);
    $statsBox.appendChild($statsBoxUp);
    $statsBox.appendChild($statsBoxDown);
    $blockLeft.appendChild($duration);
    $div.appendChild($blockLeft);
    $div.appendChild($statsBox);
    $div.appendChild($kdaBox);
    return $div;
}