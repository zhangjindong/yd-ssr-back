<template>
	<div id="video-page" class="weight-video w128">
		<h1 class="hd videoTitle">我是标题1</h1>
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