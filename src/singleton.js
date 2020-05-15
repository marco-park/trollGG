import * as API from '../APIs/API.js';

class Singleton {
    championList = null;
    spellList = null;

    constructor(){
        (async() =>{
            const {data} = await API.getChampList();            
            const champDic = {};
            Object.keys(data).map(v=>champDic[data[v].key]={name:data[v].name, id:data[v].id});
            this.championList = champDic;
         })();
         (async() =>{
            const {data} = await API.getSpellList();            
            const spellDic = {};
            Object.keys(data).map(v=>spellDic[data[v].key]={id:data[v].id});
            this.spellList = spellDic;
         })();
    }
}

export default new Singleton();