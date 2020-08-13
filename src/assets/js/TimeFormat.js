class MyTimeForm {
    constructor() {

    }
    timeStampFormat(timeStamp) {
        let res = '';
        let minute = 0;
        let second = 0;
        minute = Math.floor(timeStamp / 1000 / 60);
        second = Math.floor(timeStamp / 1000 % 60);
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        res = minute + ':' + second;
        return res;
    }
    secondFormat(seconds) {
        let res = '';
        let minute = 0;
        let second = 0;
        minute = Math.floor(timeStamp / 60);
        second = Math.floor(timeStamp % 60);
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        res = minute + ':' + second;
        return res;
    }

    dateFormat(time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let day = (date.getDate()) < 10 ? '0' + (date.getDate()) : (date.getDate());
        let res = year + '-' + month + '-' + day;
        return res;
    }

    lyrTimeFormat(time) {
        let data = time.split(':');
        let res = parseInt(data[0]) * 60 + parseFloat(data[1]);
        return res;
    }
}
export default new MyTimeForm();