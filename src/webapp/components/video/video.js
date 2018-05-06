import { mapGetters, mapState } from "vuex";
// const fetchInitialData = ({ store }) => {
//   return store.dispatch("getUserInfo");
// };

export default {
    // name: "UserInfo",
    // asyncData: fetchInitialData,
    computed: {
        ...mapGetters({
            list: "getVideoList"
        })
    },
    methods: {
        init() {
            let me = this;
            let href = location.href;
            let targetUrl;
            let tmpArr = href.split("/");
            targetUrl = tmpArr[tmpArr.length - 1];
            this.$store.dispatch("getVideo", {
                me,
                targetUrl,
            });
        },
        play(event) {
            const _tagName = event.target.tagName.toLocaleLowerCase();
            // const _videoFrame = document.getElementById("playerbox");
            if (_tagName == "a") {
                event.preventDefault();
                const panel = document.getElementById("panel");
                const arr = panel.getElementsByTagName("a");
                if (arr.length !== 0) {
                    for (let i = 0, length = arr.length; i < length; i++) {
                        //arr[i].className = "list__details";
                        arr[i].parentNode.className = "list__details";
                    }
                    //event.target.className = "list__details list__details_active";
                    event.target.parentElement.className = "list__details list__details_active";
                }
                const _vid = event.target.getAttribute("data-vid");
                // let _videovars = '<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high" align="middle" allowScriptAccess="always" width="100%" height="600" flashvars="uu=eromwdg8vf&vu=' + _vid + '&pu=F00E494D54&auto_play=1&gpcflag=1&width=1280&height=720&lang=zh_CN" type="application/x-shockwave-flash"></embed>';
                // _videoFrame.innerHTML = _videovars;
                console.log(this);
                console.log("plays", this.player);
                if (this.player) {
                    this.player.sdk.playNewId({
                        vu: _vid,
                    });
                } else {

                    this.player = new CloudVodPlayer();
                    // const wh = Libs.InitPlayerWH('playerbox');
                    this.player.init({
                        "uu": "eromwdg8vf",
                        "vu": _vid,
                        "pu": "F00E494D54",
                        "auto_play": 0,
                        "gpcflag": 1,
                        "width": "100%",
                        "height": 600,
                        "lang": "zh_CN",
                    }, "playerbox");
                }
            }
        },
        VideoTitle($event) {
            let msg = $event.target.getAttribute("data-title");

            let domStyle = document.getElementById("test").getElementsByTagName("ul")[msg].style.display;

            if (domStyle == "block") {
                document.getElementById("test").getElementsByTagName("ul")[msg].style.display = "none";
            } else {
                document.getElementById("test").getElementsByTagName("ul")[msg].style.display = "block";

            }

        },
    },
    created() {
        this.init();
    },
};