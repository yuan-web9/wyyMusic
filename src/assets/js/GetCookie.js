class GetCookie {
    constructor() {

    }
    getCookie(key) {
        // let res = count < 100000 ? count : Math.floor(count / 10000) + '万';
        // return res;
        let name = key + '=';
        let dataArr = document.cookie.split(';');
        console.log(name);
        console.log(dataArr)
        for (let i = 0; i < dataArr.length; i++) {
            let c = dataArr[i].trim();
            console.log(c)
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return -1;

    }

}
export default new GetCookie();