<template>
	<view>
		<!-- 返回区域 -->
<!-- 		<view class="returnArea" @click="returnBack">
			<view class="returnBTside"></view>
			<view class="returnBt cuIcon-back_android"></view>
			<view class="returnBTside"></view>
		</view> -->
		<!-- 个人信息 -->
		<view class="cu-list menu sm-border card-menu margin-top">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-grey font14"></text>
					<text class="text-grey font14">
						ID&nbsp:&nbsp{{stuMessage.id}}
					</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-my text-grey font14"></text>
					<text class="text-grey font14">
						姓名&nbsp:&nbsp{{stuMessage.name}}
					</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-card text-grey font14"></text>
					<text class="text-grey font14">
						账号&nbsp:&nbsp{{stuMessage.account}}
					</text>
				</view>
				<view class="action">
					<button class="cu-btn round bg-green shadow" @click="change(1)">
						<text class="cuIcon-edit"></text>更改</button>
				</view>
			</view>
			<view class="cu-item ">
				<view class="content">
					<text class="cuIcon-lock text-grey font14"></text>
					<text class="text-grey font14">
						密码&nbsp:&nbsp*********
					</text>
				</view>
				<view class="action">
					<button class="cu-btn round bg-green shadow" @click="change(2)">
						<text class="cuIcon-unlock"></text>更改</button>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-my text-grey font14"></text>
					<text class="text-grey font14">
						学号&nbsp:&nbsp{{stuMessage.number}}
					</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-grey font14"></text>
					<text class="text-grey font14">
						邮箱&nbsp:&nbsp{{stuMessage.mail}}
					</text>
				</view>
				<view class="action">
					<button class="cu-btn round bg-green shadow"
					@click="change(3)">
						<text class="cuIcon-edit"></text>更改</button>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" :mask-click="false">
			<view style="width: 100%;background-color: #ffffff;">
				<view class="returnArea" @click="close">
					<view class="returnBTside"></view>
					<view class="returnBt cuIcon-close"></view>
					<view class="returnBTside"></view>
					<view class="changeContent">
						{{changeContent}}
					</view>
				</view>
			</view>
			<view v-if="show.type1">
				<!-- 更改账号 -->
				<view class="cu-form-group">
					<view class="title">新账号：</view>
					<input :placeholder="newMessage.ph1" v-model="newMessage.account"></input>
				</view>
			</view>
			<view v-if="show.type2">
				<!-- 更改密码 -->
				<view class="cu-form-group">
					<view class="title">原密码：</view>
					<input :placeholder="newMessage.ph1" v-model="newMessage.oldpassword"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">新密码：</view>
					<input :placeholder="newMessage.ph2" v-model="newMessage.newpassword"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">邮箱：</view>
					<input :placeholder="newMessage.ph3" v-model="newMessage.inpumail" type="mail" 
					@blur="checkEmail"></input>
					<button class="cu-btn round bg-green" @click="getCode">{{countdown}}</button>
				</view>
				<view class="cu-form-group">
					<view class="title">验证码：</view>
					<input :placeholder="newMessage.ph4" v-model="newMessage.code"></input>
				</view>
			</view>
			<view v-if="show.type3">
				<!-- 更改邮箱 -->
				<view class="cu-form-group">
					<view class="title">新邮箱：</view>
					<input :placeholder="newMessage.ph1" v-model="newMessage.newmail"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">验证码：</view>
					<input :placeholder="newMessage.ph2" v-model="newMessage.code"></input>
					<button class="cu-btn round bg-green" @click="getCode">{{countdown}}</button>
				</view>
			</view>
			<view style="width: 100%;height: 0.8px;background-color: #cccccc;"></view>
			<view class="cancle">
				<view style="width:10%;"></view>
				<button class="cu-btn round bg-red" style="margin-bottom: 4px;margin-top: 4px;" @click="close">
					取消
				</button>
				<view style="width:40%;"></view>
				<button class="cu-btn round bg-green" style="margin-bottom: 4px;margin-top: 4px;" @click="submit">
					提交
				</button>
				<view style="width:10%;"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stuMessage: {},
				Code: {
					to: "746662113@qq.com",
					from: "1935461147@qq.com",
					topic: "验证码",
					content: "contentTest",
				},
				newMessage: {
					ph1: "", //placehold
					ph2: "",
					ph3: "",
					ph4: "",
					oldpassword: "",
					newpassword: "",
					inpumail: "", //输入的邮箱
					code: "" ,//输入的验证码
					newmail:""
				},
				show: {
					type1: false,
					type2: true,
					type3: false
				},
				countdown: "提交",
				trueCode: "", //实际验证码
				enableSubmit: {
					passwordCheck: false
				},
				changeContent:"",
				newStudent:{
					id:"s001",
					name:"申鹤",
					number:"3190608020",
					password:"123",
					account:"zh",
					sex:"男",
					phone:"2579247368"

				}
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'studentMessage',
				success: res => {
					this.stuMessage = res.data
					console.log(this.stuMessage)
				}
			})
			this.newStudent.id=this.stuMessage.id
			this.newStudent.name=this.stuMessage.name
			this.newStudent.number=this.stuMessage.number
			this.newStudent.account=this.stuMessage.account
			this.newStudent.password=this.stuMessage.password
			this.newStudent.phone=this.stuMessage.mail
		},
		methods: {
			// studentMessage: {
			// 	id: "12312",
			// 	name: "adffa",
			// 	number: "3190080**",
			// 	account: "fjdaskfj",
			// 	password: "1234567",
			// 	mail: "12345678901"
			// }
			submit() {
				//改密码-需要校验邮箱验证码
				if(this.changeContent=="更改账号"){
					this.newStudent.account=this.newMessage.account
					//直接请求
					console.log(this.newStudent)
					uni.request({
						url: 'http://139.196.45.104:9001/updateStudent',
						data: {
							student:this.newStudent
						},
						method:"POST",
						success: (res) => {
							console.log(res.data);
							this.stuMessage.account=this.newStudent.account
							uni.showToast({
								title: "修改成功",
								duration: 2000,
								icon:"error"
							});
							this.$refs.popup.close()
						},
						fail: (res) => {
							console.log(res)
						}
					});
				}
				if(this.changeContent=="更改密码"||this.changeContent=="更改绑定邮箱"){
					
					if(this.newMessage.inpumail==""){
						uni.showToast({
							title: "验证码不能为空",
							duration: 2000,
							icon:"error"
						});
					}else if(this.newMessage.code!=this.trueCode){
						uni.showToast({
							title: "验证码错误",
							duration: 2000,
							icon:"error"
						});
					}else{						
						if(this.changeContent=="更改密码"){
							this.newStudent.password=this.newMessage.newpassword
							//发送请求
							uni.request({
								url: 'http://139.196.45.104:9001/updateStudent',
								data: {
									student:this.newStudent
								},
								method:"POST",
								success: (res) => {
									console.log(res.data);
									this.stuMessage.password=this.newStudent.password
									uni.showToast({
										title: "修改成功",
										duration: 2000,
										icon:"error"
									});
									this.$refs.popup.close()
								},
								fail: (res) => {
									console.log(res)
								}
							});														
						}
						if(this.changeContent=="更改绑定邮箱"){
							this.newStudent.phone=this.newMessage.newmail
							//发送请求
							uni.request({
								url: 'http://139.196.45.104:9001/updateStudent',
								data: {
									student:this.newStudent
								},
								method:"POST",
								success: (res) => {
									console.log(res.data);
									this.stuMessage.mail=this.newStudent.phone
									uni.showToast({
										title: "修改成功",
										duration: 2000,
										icon:"error"
									});
									this.$refs.popup.close()
								},
								fail: (res) => {
									console.log(res)
								}
							});		
							
						}
					}
				}
			},
			change(e) {
				//显示弹窗
				this.$refs.popup.open('center')
				console.log(e)
				if (e == 1) {
					this.changeContent="更改账号"
					this.show.type1 = true;
					this.show.type2 = false;
					this.show.type3 = false;	
					this.newMessage.ph1="输入新账号"
				} else if (e == 2) {
					this.changeContent="更改密码"
					this.show.type1 = false;
					this.show.type2 = true;
					this.show.type3 = false;
					this.newMessage.ph1="输入旧密码"
					this.newMessage.ph2="输入新密码"
					this.newMessage.ph3="输入绑定邮箱"
					this.newMessage.ph4="输入邮箱验证码"
				}else if(e==3){
					this.changeContent="更改绑定邮箱"
					this.show.type1 = false;
					this.show.type2 = false;
					this.show.type3 = true;
					this.newMessage.ph1="输入旧邮箱"
					this.newMessage.ph2="输入新邮箱"
				}
			},
			returnBack() {
				uni.navigateBack({})
			},
			close() {
				this.$refs.popup.close()
				if(this.changeContent=="更改密码"||this.changeContent=="更改绑定邮箱"){
					clearTimeout(times);
					this.countdown="获取"
				}
			},
			getCode(){
				//获取验证码
				if(typeof(this.countdown)==Number){
					this.countdown=this.countdown*1
					if(this.countdown>0){
						uni.showToast({
							title: this.countdown+"秒后再试",
							duration: 2000,
							icon:"error"
						});
					}else{
						uni.showToast({
							title: "验证码已发送",
							duration: 2000,
							icon:"success"
						});
						this.countdown=30
						var times = setInterval(() => {
							this.countdown--; //递减						
							if (this.countdown <= 0) {
								  clearInterval(times);
								  this.countdown="获取"
							}
						}, 1000); //1000毫秒后执行		
					}
				}else{
					this.trueCode=Math.round(Math.random()*(8999)+1000)
					this.Code.content=this.trueCode
					uni.request({
						url: 'https://route.showapi.com/2377-1?showapi_appid=1072728&showapi_sign=12bcb88ceda8423494b3d5317f321de0'+
						"&to="+this.Code.to+"&from_to="+this.Code.from+"&topic="+this.Code.topic+"&content="+this.Code.content,
						method: "POST",				
						success: (res) => {
							console.log(res.data);
							this.text = 'request success';
						}
					});
					this.countdown=30
					var times = setInterval(() => {
						this.countdown--; //递减						
						if (this.countdown <= 0) {
							  clearInterval(times);
							  this.countdown="获取"
						}
					}, 1000); //1000毫秒后执行
					uni.showToast({
						title: "验证码已发送",
						duration: 2000,
						icon:"success"
					});
				}
				
			},
			checkEmail() {
				// 邮箱校验
				const email = this.newMessage.inpumail
				if (email) {
					const reg = RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(email)
					if (reg) {
						return true
					} else {
						uni.showModal({
							title: '请输入正确的邮箱',
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									this.newMessage.inpumail = ''
								}
							}
						})
					}
				}
			}

		}
	}
</script>

<style scoped>
	.returnArea {
		width: 100%;
		height: 28px;
		display: flex;
		flex-direction: row;
		justify-content: left;
	}
	.changeContent{
		/* 弹出层标题 */
		width: 130px;
		justify-content: right;
		display: flex;
		align-items: center;
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

	.returnBTside {
		width: 26px;
		background-color: #ffffff;
		border-radius: 100%;
	}

	.font14 {
		font-size: 14px;
	}

	.cancle {
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		vertical-align: middle;

	}
</style>
