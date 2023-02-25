<template>
	<view>
<!-- 		<view class="returnArea" @click="returnBack">
			<view class="returnBTside"></view>
			<view class="returnBt cuIcon-back_android"></view>
			<view class="returnBTside"></view>
		</view> -->
		<view>
			<!-- 留言 -->
			<!-- 接收:教师姓名，留言内容，留言时间，回复时间教师邮箱 -->
			<view class="leave" v-for="(item,index) in returnMessage">
				<uni-collapse>
					<uni-collapse-item :title="`教师：`+item.teacher+`-`+`时间:   `+item.time">
						<view class="content">
							教师邮箱：{{item.teacherEmail}}
						</view>
						<view class="content">
							我的发言：{{item.content}}
						</view>
						<view class="content">
							回复的留言：{{item.response}}
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stuMessage:{},
				returnMessage:[]
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'studentMessage',
				success: res => {
					this.stuMessage = res.data
					// console.log(this.stuMessage)
				}
			})
			uni.request({
			    url: 'http://139.196.45.104:9001/studentGetLeave',
			    header: {
			        'custom-header': 'hello'
			    },
				data:{
					sid:"s001"
				},
			    success: (res) => {
			        console.log(res.data.data);			
					this.returnMessage=res.data.data
					//时间戳转标准时间格式
					for (let i = 0; i < this.returnMessage.length; i++) {
						let temp = 0
						this.returnMessage[i].time = this.returnMessage[i].time + 0
						temp = this.returnMessage[i].time
						this.returnMessage[i].time = this.timestampTotime("date", temp) + "/" + this.timestampTotime("time", temp)
					}
			    },
				fail:(res)=>{
					console.log(res)
				}
			});		
		},
		methods: {
			returnBack(){
				uni.navigateBack({
					
				})
			},
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
	.returnArea {
		width: 100%;
		height: 28px;
		display: flex;
		flex-direction: row;
		justify-content: left;
	}
	.returnBTside {
		width: 26px;
		background-color: #ffffff;
		border-radius: 100%;
	}
	.returnBt {
		text-align: center;
		background-color: #ffffff;
		/* border-radius: 8px; */
		width: 26px;
		margin-right: -13px;
		margin-left: -13px;
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99;
	}
	.content{
		margin-bottom: 4px;
		text-align: center;
		font-size: 14px;
	}
</style>
