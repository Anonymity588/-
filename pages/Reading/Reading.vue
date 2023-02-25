<template>
	<!-- 心理导读页面 -->
	<!--  -->
	<view>
		<view class="cu-card article" v-for="(item, index) in article" @click="showarticle(index)">
			<view class="cu-item shadow">
				<view class="title">
					<view class="text-cut">{{item.title}}</view>
				</view>
				<view class="content">
					<view class="desc">
						<view class="text-content">{{item.content}}</view>
						<view style="text-align: right;">
							<view class="cu-tag bg-red light sm round">作者：{{item.publisher}}</view>
							<view class="cu-tag bg-green light sm round">{{item.time}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" :mask-click="false">
			<view style="width: 100%;height: 24x;background-color: aliceblue;font-size: 18px;" class="cuIcon-close"
				@click="close"></view>
			<scroll-view style="width: 600rpx;height: 800rpx; background-color: aliceblue;">
				<view class="titlearea">
					{{temparr.title}}
				</view>
				<view class="contrent">
					{{temparr.content}}
				</view>
				<view class="otherMessage">
					作者:{{temparr.publisher}}&nbsp;创作时间:{{temparr.time}}
				</view>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: [],
				temparr: {}
			}
		},
		onLoad() {
			uni.request({
				url: 'http://139.196.45.104:9001/getArticle', //仅为示例，并非真实接口地址。
				data: {
					type: 2
				},
				header: {
					'custom-header': 'hello' //自定义请求头信息
				},
				success: (res) => {
					console.log();
					this.article=res.data.data
					for (let i = 0; i < this.article.length; i++) {
						let temp = this.article[i].time
						this.article[i].time = this.timestampTotime("date", temp) + "/" + this.timestampTotime("time", temp)
					}
					console.log(this.article)
				},
				fail: (res) => {
					console.log(res)
				}
			});			
		},
		methods: {
			showarticle(index) {
				this.$refs.popup.open('center')
				this.temparr = this.article[index]

			},
			close() {
				this.$refs.popup.close()
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
	.titlearea {
		width: 100%;
		font-size: 18px;
		text-align: center;
	}

	.contrent {
		font-size: 14px;
		text-indent: 32px;
	}

	.otherMessage {
		margin-top: 4px;
		width: 100%;
		text-align: right;
		font-size: 12px;
	}
</style>
