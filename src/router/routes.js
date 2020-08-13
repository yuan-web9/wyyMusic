export const routes = [{
        path: '/main',
        name: 'Main',
        component: r => require(['../views/Main.vue'], r),
        children: [{
                path: '/recommend',
                name: 'Recommend',
                component: r => require(['../views/Recommend.vue'], r)
            },
            {
                path: '/songListDetail',
                name: 'SongListDetail',
                component: r => require(['../views/SongListDetail.vue'], r)
            },
            {
                path: '/rankList',
                name: 'RankList',
                component: r => require(['../views/RankList.vue'], r)
            },
            {
                path: '/songList',
                name: 'SongList',
                component: r => require(['../views/SongList.vue'], r)
            },
            {
                path: '/song',
                name: 'Song',
                component: r => require(['../views/Song.vue'], r)
            },
            {
                path: '/album',
                name: 'Album',
                component: r => require(['../views/Album.vue'], r)
            },
            {
                path: '/searchPage',
                name: 'SearchPage',
                component: r => require(['../views/SearchPage.vue'], r)
            },
        ]
    },
    {
        path: '/testPage',
        name: 'TestPage',
        component: r => require(['../views/TestPage.vue'], r),
    },

    {
        path: '*',
        redirect: {
            name: 'Recommend'
        }
    }

]