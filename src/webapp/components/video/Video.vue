<template>
	<div id="video-page" class="weight-video w128">
		<h1 class="hd videoTitle">{{title}}</h1>
		<div class="bd">
			<div id="panel">
				<ul class="list list-unstyled" id="test">
					<li class="list__item" v-if="lenBool" style="margin: 20px 0 0 10px;color: white;">{{lenBool}}😭视频库暂无资源。</li>
                    <li class="list__item" v-else v-for="(item,ind) in list" :key="ind">
                    <span class="list__key" data-lid="js-li-linux" v-bind:data-title="item.title" > {{item.title}} </span>
                    <transition name="fade">
                        <ul class="list-unstyled ">
                            <li class="list__details " v-for="(itemIn,idx) in item.details" :key="idx">
                                <a class="list_title" href="" v-bind:data-vid="itemIn.vid">
                                    {{itemIn.title}}
                                </a>
                            </li>
                        </ul>
                    </transition>
                </li>
				</ul>
			</div>
			<section>
					<div id="playerbox" class="player"></div>
			</section>
		</div>
	</div>
</template>
<style scoped>
 @import 'http://apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.min.css';
 @import './video.css';
 :root {
  --bgcolor: #333;
  --maincolor: #6c6;
  --bgshadow: 2px 2px 5px var(--bgcolor);
}
</style>
<script>
export default{
  data(){
      return{
        seenmsg: "",
        msg: "text",
        lenBool: "",
        title:'我是标题',
        list: [
           {
            "title": "Nodejs基础API",
            "details": [{
                    "title": "1.走进NodeJS",
                    "vid": "38e4b2af70"
                },
                {
                    "title": "2.Node.js基础入门",
                    "vid": "642b01bef5"
                },
                {
                    "title": "3.Node.js开发第一个应用",
                    "vid": "1cce4a1cdf"
                },
                {
                    "title": "4.Node.js回掉机制",
                    "vid": "1ae5c2209b"
                },
                {
                    "title": "5.Node.js事件驱动机制",
                    "vid": "d9afa09126"
                },
                {
                    "title": "6.Node.js模块化",
                    "vid": "2cb0856713"
                },
                {
                    "title": "7.Node.js函数",
                    "vid": "3ae2735599"
                },
                {
                    "title": "8.Node.js路由",
                    "vid": "2834ce4862"
                },
                {
                    "title": "9.Node.js全局方法和工具",
                    "vid": "aa5ab0c4e5"
                },
                {
                    "title": "10.Node.js文件系统",
                    "vid": "7fb3ee9a64"
                },
                {
                    "title": "11.Node.jsWeb服务器",
                    "vid": "45b335194d"
                }
            ],
            "key": 0
        }
        ]
      }
  }
}
</script>
