const HEADER_APPJSON = 'application/json';
const HEADER_WWWENCODED = 'application/x-www-form-urlencoded;charset=UTF-8';

const bodyEncoder = (data=null) => {
    let formBody = [];
    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}

export const getServer = async (url, data = null) => {
    try{
        url = url + '?' + bodyEncoder(data);
        let res = await fetch(url, {
            method : 'GET',
            headers: {
                Accept: HEADER_APPJSON,
                'Content-Type' : HEADER_WWWENCODED,
            },
        });
        if(res.ok) return res;
        console.log(await res.json());
        return null;        
    }catch(e){
        console.log('get' +e);
    }
}
