class MusicListUpdate {
    constructor() {

        }
        // 添加歌曲到列表或播放列表音乐
        // data格式:
        // data:[
        //     {
        //         id:歌曲id,
        //         name:歌曲名,
        //         songer:歌手(id,name),
        //         songImg:封面,
        //         state:状态,
        //     },
        //     {}....
        // ]
    addMusic(data) {
        // console.log(data);
        console.log('addMusic');
        if (localStorage.getItem("__music-list") == undefined) {
            let arr = [];
            for (let j = 0; j < data.length; j++) {
                // console.log('无记录循环')
                let d = data[j];
                d.state = false;
                arr.push(d);
            }
            localStorage.setItem("__music-list", JSON.stringify(arr));
            // console.log('asd')
            // return j - 1;
        } else {
            // let isHas = false;
            // console.log('记录循环')
            let local = JSON.parse(localStorage.getItem("__music-list"));
            // console.log(local)

            let dataArr = [];
            for (let i = 0; i < local.length; i++) {
                dataArr.push(local[i]);
            }
            for (let i = 0; i < data.length; i++) {
                let isHas = false;
                for (let j = 0; j < local.length; j++) {
                    if (local[j].id == data[i].id) {
                        isHas = true;
                        break;
                    }
                }
                if (isHas) {
                    continue;
                }
                console.log('加1');

                // 添加状态
                let d = data[i];
                d.state = false;
                dataArr.push(d);
            }


            console.log(dataArr);
            localStorage.setItem("__music-list", JSON.stringify(dataArr));
        }
    }

    addAndPlay(data) {
        console.log('addAndPlay');
        let first;
        if (data != undefined && data.length != 0) {
            first = data[0];
        }
        this.addMusic(data);
        let local = JSON.parse(localStorage.getItem("__music-list"))
        for (let i = 0; i < local.length; i++) {
            local[i].state = false;
            if (first.id == local[i].id) {
                local[i].state = true;
            }
        }
        console.log('addAndPlay==>', local);
        localStorage.setItem("__music-list", JSON.stringify(local));
    }



}
export default new MusicListUpdate();