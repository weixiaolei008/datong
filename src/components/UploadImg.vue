<template>
	<el-upload :action="url" :data="headers" :on-success="handleSuccess" :before-upload="beforeAvatarUpload" :show-file-list="false">
		<div style="margin-top: -40px;">
			<span class="icon">+</span>
			<p style="fontSize: 12px; color: #999; line-height: 1.5;">只能上传 .jpg/.jpeg/.png/.bmp文件</p>
		</div>
	</el-upload>
</template>
<!-- accept=".jpg,.jpeg,.png,.bmp"  -->
<script>
	import {sGet,exportUrl} from "@/common/config/utils"

	export default {
		name: "UploadImg",
		data() {
			return {
				headers: {
					token: ''
				},
				url:''
			}
		},
		methods: {
			handleSuccess(res) {
				if(res.repCode == '0000') {
					this.$emit('handle-success', res.repData.foreignUrl);
				}
				console.log(res, 'uploasimg-res--')
			},
			beforeAvatarUpload(file) {
		        const isLt2M = file.size / 1024 / 1024 < 10;
		  //       const isJPG = file.type === 'image/jpeg'  || 'image/jpg' || 'image/png' || 'image/bmp';
		  //       console.log(isJPG, 'isJPG', file.type)
				// if (!isJPG) {
		  //         this.$message.error('系统支持图片上传格式jpg, jpeg, png, bmp!');
		  //         return false;
		  //       }
		        var testmsg = /^image\/(jpg|png|bmp|jpeg)$/.test(file.type)
				if (!testmsg) {
					this.$message.warning('上传图片格式不对!');
					return
				}
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 10MB!');
		          return false;
		        }
		        return testmsg && isLt2M;
		     }

		},
		created() {
			let user = sGet('_WHUser');
			this.headers.token = user.token;
			this.url = exportUrl + 'fileUpload/uploadImg'
		}
	}
</script>

<style scoped>
	.img {
		width: 130px;
		display: inline-block;
		height: 160px;
		border: 2px dashed #CCCCCC;
		position: relative;
	}
	.icon{
		font-size: 50px;
		color: #ccc;
		line-height: 160px;
	}
	.imgStyle{
		width:130px;
		height: 160px;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
