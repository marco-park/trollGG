const form = document.querySelector(".requestSummoner"),
    input = form.querySelector("input");

const handleSubmit = async(e) =>{
    e.preventDefault();
    const summonerName = input.value;
    location.href=`./src/summoner.html?summonerName=${summonerName}`;
}

export const app = () =>{
    form.addEventListener("submit",handleSubmit);
}