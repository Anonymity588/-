<template>
	<!-- 心理咨询页面 -->
	<view>
		<!-- 公告 -->
		<view class="uni-margin-wrap gonggao">
			<swiper class="swiper" circular indicator-dots="true" autoplay="true" interval="5000" duration="1000">
				<swiper-item v-for="item in notice">
					<view class="swiper-item">
						<view class="notice_title">
							{{item.title}}
						</view>
						<view class="notice_content">
							{{item.content}}
						</view>
						<view class="notice_time">
							{{item.time}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view style="width: 100%;height: 16px;"></view>
		<!-- 四种文章板块 -->
		<view>
			<view class="line">
				<!-- 碧落 -->
				<view class="bankuai radius shadow-warp" style="background-color: rgb(174, 208,238);"
					@click="showDrawerRight1">
					<view class="son">
						自我认同<br />自测
					</view>
				</view>
				<!-- 瓷秘 -->
				<view style="height: 268px;width: 12px;"></view>
				<view class="bankuai radius shadow-warp" style="background-color:rgb(255, 251,199);"
				@click="showDrawerLeft3">
					<view class="son">
						焦虑程度<br />自测
					</view>
				</view>
			</view>
			<view style="width: 100%; height: 12px;"></view>
			<view class="line">
				<!-- 桃夭 -->
				<view class="bankuai radius shadow-warp" style="background-color:rgb(246,190,200);"
				 @click="showDrawerRight2">
					<view class="son">
						抑郁症<br />自测
					</view>
				</view>
				<!-- 月白 -->
				<view style="height: 268px;width: 12px;"></view>
				<view class="bankuai radius shadow-warp" style="background-color:rgb(212,241,239);"
				@click="showDrawerLeft4">
					<view class="son">
						社交能力<br />自测
					</view>
				</view>
			</view>
		</view>
		<!-- 左侧，自我认同 -->
		<uni-drawer ref="showRight1" mode="right" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">	
				<view v-for="item in titlelist1" class="drawerclass"
				@click="article1click1(item)">
					<view class="listtitle">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
		<!-- 右侧，抑郁症 -->
		<uni-drawer ref="showRight2" mode="right" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<view v-for="item in titlelist2" class="drawerclass" 
				@click="article1click2(item)">
					<view class="listtitle">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
		<!-- 左侧 焦虑程度自测 -->
		<uni-drawer ref="showLeft3" mode="left" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<view v-for="item in titlelist3" class="drawerclass"
				@click="article1click3(item)">
					<view class="listtitle">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
		<!-- 左侧 社交能力自测 -->
		<uni-drawer ref="showLeft4" mode="left" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<view v-for="item in titlelist4" class="drawerclass"
				@click="article1click4(item)">
					<view class="listtitle">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice: [],		
				// 文章内容
				titlelist1:[],
				titlelist2:[],
				titlelist3:[],
				titlelist4:[]
			}
		},
		onLoad() {	
			//请求公告
			uni.request({
			    url: 'http://139.196.45.104:9001/getNotice',
			    header: {
			        'custom-header': 'hello'
			    },
			    success: (res) => {
			        console.log(res.data.data);			
					this.notice=res.data.data
					//时间戳转标准时间格式
					for (let i = 0; i < this.notice.length; i++) {
						let temp = 0
						this.notice[i].time = this.notice[i].time + 0
						temp = this.notice[i].time
						this.notice[i].time = this.timestampTotime("date", temp) + "/" + this.timestampTotime("time", temp)
					}
			    },
				fail:(res)=>{
					console.log(res)
				}
			});			
		},
		methods: {
			article1click1(e){
				console.log(e)
				uni.navigateTo({
					url:'/pages/questionnaire/questionnaire?id='+e.id+"&title="+e.name
				});
			},
			article1click2(e){
				uni.navigateTo({
					url:'/pages/questionnaire/questionnaire?id='+e.id+"&title="+e.name
				});
			},
			article1click3(e){
				uni.navigateTo({
					url:'/pages/questionnaire/questionnaire?id='+e.id+"&title="+e.name
				});name
			},
			article1click4(e){
				uni.navigateTo({
					url:'/pages/questionnaire/questionnaire?id='+e.id+"&title="+e.name
				});
			},
			//打开相应的抽屉
			showDrawerRight1() {
				uni.request({
				    url: 'http://139.196.45.104:9001/getQuestion1',
				    data: {
				       type:1
				    },
				    header: {
				        'custom-header': 'hello'
				    },
				    success: (res) => {
				        console.log(res.data.data);
						this.titlelist1=res.data.data
				    },
					fail:(res)=>{
						console.log(res)
					}
				});
				this.$refs.showRight1.open();				
			},
			showDrawerRight2() {
				uni.request({
				    url: 'http://139.196.45.104:9001/getQuestion2', //仅为示例，并非真实接口地址。
				    data: {
				       type:2
				    },
				    header: {
				        'custom-header': 'hello' //自定义请求头信息
				    },
				    success: (res) => {
				        console.log(res.data.data);
						this.titlelist2=res.data.data
				    },
					fail:(res)=>{
						console.log(res)
					}
				});
				this.$refs.showRight2.open();
			},
			showDrawerLeft3() {
				uni.request({
				    url: 'http://139.196.45.104:9001/getQuestion3', //仅为示例，并非真实接口地址。
				    data: {
				       type:3
				    },
				    header: {
				        'custom-header': 'hello' //自定义请求头信息
				    },
				    success: (res) => {
				        console.log(res.data.data);
						this.titlelist3=res.data.data	
				    },
					fail:(res)=>{
						console.log(res)
					}
				});
				this.$refs.showLeft3.open();
			},
			showDrawerLeft4() {
				uni.request({
				    url: 'http://139.196.45.104:9001/getQuestion4',
				    data: {
				       type:4
				    },
				    header: {
				        'custom-header': 'hello'
				    },
				    success: (res) => {
				        console.log(res.data.data);
						this.titlelist4=res.data.data
				    },
					fail:(res)=>{
						console.log(res)
					}
				});
				this.$refs.showLeft4.open();
			},
			//时间戳转格式化日期具体函数
			timestampTotime(format, timestamp) {
				let time = new Date(parseInt(timestamp))
				//console.log(time)
				let month = time.getMonth() + 1;
				let day = time.getDate();
				//console.log(day+"day")
				let h = time.getHours();
				//console.log(h+"h")
				let m = time.getMinutes();
				let s = time.getSeconds();
				if (format == "date") {
					if (month >= 1 && month <= 9) {
						month = "0" + month
					}
					if (day >= 1 && day <= 9) {
						day = '0' + day
					}
					return month + "-" + day
				} else {
					if (h >= 0 && h <= 9) {
						h = '0' + h
					}
					if (m >= 0 && m <= 9) {
						m = '0' + m
					}
					if (s >= 0 && s <= 9) {
						s = '0' + s
					}
					return h + ":" + m + ":" + s
				}
			}

		}
	}
</script>

<style scorped>
	.gonggao{
		box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
		height: auto;
	}
	.notice_title {
		width: 100%;
		text-align: center;
		font-size: 18px;
		color: rgb(201, 31, 55);
		text-overflow: ellipsis;
		word-wrap: break-word;
	}

	.notice_content {
		font-size: 14px;
		text-indent: 32px;
	}

	.notice_time {
		width: 100%;
		color: #000000;
		font-size: 12px;
		text-align: right;
	}

	.line {
		display: flex;
		flex-direction: row;
		height: 208px;
		margin: 12px;
	}

	.bankuai {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50%;
		text-align: center;
		font-size: 24px;
	}

	.son {
		text-align: center;
	}
	.listtitle{
		font-size: 16px;
		text-overflow: ellipsis;
		word-wrap: break-word;
	}
	.drawerclass{
		height: 46px;
		text-overflow: ellipsis;
		word-wrap: break-word;
		margin-bottom: 8px;
		font-size: 16px;
		box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
