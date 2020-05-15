import * as API from '../APIs/API.js';

export const match = async(match,accountId)=>{
    const {timestamp, gameId} = match;
    const matchRes = await API.getRiotMatch({gameId});
    console.log(matchRes);
    const {gameCreation, gameDuration, teams, participantIdentities, participants} = matchRes;

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
    var $championProfile = document.createElement('div');
 
    participantIdentities.map((v,i)=>{
        if(v.player.accountId  == accountId){
            const {championId, teamId} = participants[v.participantId-1];
            const isWin =  teams[(teamId-100)/100].win;
            $div.style.backgroundColor = isWin == "Win" ? '#a3cfec' : '#e2b6b3';
            var $isWin = document.createElement('div');
            $isWin.innerHTML = isWin == "Win" ? "승리" : "패배"
            $isWin.style.marginBottom = '3px';
            $isWin.style.color = isWin == "Win" ? '#1a78ae' : '#c6443e';
            $blockLeft.appendChild($isWin);
        }
    })    
    $blockLeft.appendChild($duration);
    $div.appendChild($blockLeft);
    $div.appendChild($statsBox);
    return $div;
}