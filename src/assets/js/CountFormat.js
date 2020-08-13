class CountFormat {
    constructor() {

    }
    countFormat(count) {
        let res = count < 100000 ? count : Math.floor(count / 10000) + '万';
        return res;
    }
}
export default new CountFormat();