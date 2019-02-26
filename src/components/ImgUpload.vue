<template>
	<el-upload :action="url" :data="headers" :on-success="ImgUpload" :show-file-list="false" :before-upload="beforeAvatarUpload" accept=".jpg,.png,.bmp,.jpeg">
		<div class="btn-receive ImgStyle"><span class="icon-upload icon">上传附件</span></div>
		<div class="el-upload__tip" slot="tip">只能上传jpg/png/bmp/jpeg文件</div>
	</el-upload>
</template>

<script>
	import {
		sGet,
		exportUrl
	} from "@/common/config/utils"

	export default {
		name: "UploadImg",
		data() {
			return {
				headers: {
					token: ''
				},
				url: ''
			}
		},
		methods: {
			// accept=".jpg,.png,.bmp,.jpeg"
			beforeAvatarUpload(file) {
				var testmsg = /^image\/(jpg|png|bmp|jpeg)$/.test(file.type)
				if (!testmsg) {
					this.$message.warning('上传图片格式不对!');
					return
				}
				return file
			},
			ImgUpload(res) {
        if(res.repCode != '0000'){
          this.msgInfo(res.repMsg);
        }
        else{
          this.$emit('handle-success', res.repData.foreignUrl);
        }
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
	.ImgStyle {
		background: #fff;
		border-color: #00CC99;
		color: #00CC99;
		border: 1px solid #00CC99;
		margin-left: 28px
	}

	.icon {
		background-position: 10px
	}
</style>
