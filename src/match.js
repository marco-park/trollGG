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

    var $statsInfo = document.createElement('div');
    $statsInfo.className = 'stats_info';
    var $levelInfo = document.createElement('div');
    var $csInfo = document.createElement('div');
    var $killRelate = document.createElement('div');

    var $itemInfo = document.createElement('div');
    $itemInfo.className = 'item_info';
    var $items0 = document.createElement('div');
    $items0.className = 'items';
    var $items1 = document.createElement('div');
    $items1.className = 'items';
    var $wardBought = document.createElement('div');

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
    $killRelate.style.color = '#c6443e';
    $levelInfo.style.marginBottom = '7px';
    $csInfo.style.marginBottom = '7px';
    $wardBought.style.marginTop = '5px';

    var participantId = 0;
    var myTeamId = 100;
    const url = `https://ddragon.leagueoflegends.com/cdn/10.9.1/img/`;
 
    participantIdentities.map((v,i)=>{
        if(v.player.accountId  == accountId){
            participantId = v.participantId;
            const {championId, teamId} = participants[participantId-1];
            myTeamId = teamId;
            $championProfile.src = `${url}champion/${champDic[championId].id}.png`;
            $statsBoxDown.innerHTML = champDic[championId].name;
            const isWin =  teams[(myTeamId-100)/100].win;
            $div.style.backgroundColor = gameDuration < 600 ? "rgb(176,176,176)" : isWin == "Win" ? '#a3cfec' : '#e2b6b3';
            var $isWin = document.createElement('div');
            $isWin.innerHTML = gameDuration < 600 ? "<b>다시하기</b>" : isWin == "Win" ? "<b>승리</b>" : "<b>패배</b>"
            $isWin.style.marginBottom = '3px';
            $isWin.style.color = gameDuration < 600 ? "#000" : isWin == "Win" ? '#1a78ae' : '#c6443e';
            $blockLeft.appendChild($isWin);
        }
    });    
    var myTeamTotalKill = 0;
    var participantsInfo = [];

    participants.map((v,i)=>{
        if(v.teamId == myTeamId){
            myTeamTotalKill+=v.stats.kills;
        }
    })

    const {spell1Id,spell2Id,
        stats:{champLevel,totalMinionsKilled,neutralMinionsKilled,visionWardsBoughtInGame,kills,assists,deaths,item0,item1,item2,item3,item4,item5,item6}
    } =  participants[participantId-1];


    $kills.innerHTML = kills + '    /   ';
    $deaths.innerHTML = deaths;
    $assists.innerHTML = '  /   ' +  assists;
    $kdaRatio.innerHTML = `<b>${((kills+assists)/Math.max(1,deaths)).toFixed(2)}</b> 평점`;

    $levelInfo.innerHTML = `레벨 ${champLevel}`;
    $csInfo.innerHTML = `${totalMinionsKilled+neutralMinionsKilled} (${((totalMinionsKilled+neutralMinionsKilled)/parseInt(gameDuration/60)).toFixed(1)}) CS`;
    $killRelate.innerHTML = `킬관여 ${parseInt(((kills+assists)/Math.max(1,myTeamTotalKill)) * 100)}%`;

    var $item0div = document.createElement('div');
    $item0div.className = 'item';
    var $item0 = document.createElement('img');
    $item0.className = 'item_img';
    if(item0!=0)$item0.src = `${url}item/${item0}.png`
    var $item1div = document.createElement('div');
    $item1div.className = 'item';
    var $item1 = document.createElement('img');
    $item1.className = 'item_img';
    if(item1!=0)$item1.src = `${url}item/${item1}.png`
    var $item2div = document.createElement('div');
    $item2div.className = 'item';
    var $item2 = document.createElement('img');
    $item2.className = 'item_img';
    if(item2!=0)$item2.src = `${url}item/${item2}.png`
    var $item3div = document.createElement('div');
    $item3div.className = 'item';
    var $item3 = document.createElement('img');
    $item3.className = 'item_img';
    if(item3!=0)$item3.src = `${url}item/${item3}.png`
    var $item4div = document.createElement('div');
    $item4div.className = 'item';
    var $item4 = document.createElement('img');
    $item4.className = 'item_img';
    if(item4!=0)$item4.src = `${url}item/${item4}.png`
    var $item5div = document.createElement('div');
    $item5div.className = 'item';
    var $item5 = document.createElement('img');
    $item5.className = 'item_img';
    if(item5!=0)$item5.src = `${url}item/${item5}.png`
    var $item6div = document.createElement('div');
    $item6div.className = 'item';
    var $item6 = document.createElement('img');
    $item6.className = 'item_img';
    if(item6!=0)$item6.src = `${url}item/${item6}.png`
    $item6.style.marginRight = '10px';
    $wardBought.innerHTML = `제어 와드 <b>${visionWardsBoughtInGame}</b>`;
    
    $championProfilediv.appendChild($championProfile);
    $spell1Profile.src = `${url}spell/${spellDic[spell1Id].id}.png`
    $spell2Profile.src = `${url}spell/${spellDic[spell2Id].id}.png`
    $spell1Profilediv.appendChild($spell1Profile);
    $spell2Profilediv.appendChild($spell2Profile);
    $spellProfile.appendChild($spell1Profilediv);
    $spellProfile.appendChild($spell2Profilediv);

    $kdaBox.appendChild($kills);
    $kdaBox.appendChild($deaths);
    $kdaBox.appendChild($assists);
    $kdaBox.appendChild($kdaRatio);

    $statsInfo.appendChild($levelInfo);
    $statsInfo.appendChild($csInfo);
    $statsInfo.appendChild($killRelate);

    $item0div.appendChild($item0);
    $item1div.appendChild($item1);
    $item2div.appendChild($item2);
    $item3div.appendChild($item3);
    $item4div.appendChild($item4);
    $item5div.appendChild($item5);
    $item6div.appendChild($item6);
    $items0.appendChild($item0div);
    $items0.appendChild($item1div);
    $items0.appendChild($item2div);
    $items1.appendChild($item3div);
    $items1.appendChild($item4div);
    $items1.appendChild($item5div);
    $itemInfo.appendChild($items0);
    $itemInfo.appendChild($items1);
    //$itemInfo.appendChild($wardBought);

    $statsBoxUp.appendChild($championProfilediv);
    $statsBoxUp.appendChild($spellProfile);
    $statsBox.appendChild($statsBoxUp);
    $statsBox.appendChild($statsBoxDown);
    $blockLeft.appendChild($duration);
    $div.appendChild($blockLeft);
    $div.appendChild($statsBox);
    $div.appendChild($kdaBox);
    $div.appendChild($statsInfo);
    $div.appendChild($itemInfo);
    $div.appendChild($item6);
    return $div;
}