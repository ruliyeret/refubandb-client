<template>
	<section class="img-upload-container">
		<img
			v-if="isLoading"
			class="loading"
			src="https://i.pinimg.com/originals/f6/65/6a/f6656aa6fdb6b8f905dea0bcc2d71dd8.gif"
			alt=""
		/>
		<label v-else>
			<span class="material-icons">
				cloud_upload
			</span>
			<input @change="onUploadImg" type="file" id="imgUpload" hidden multiple />
		</label>
	</section>
</template>

<script>
import { uploadImg } from '@/services/img-upload.service.js'
export default {
	data() {
		return {
			isLoading: false,
		}
	},
	methods: {
		async onUploadImg(ev) {
			this.isLoading = true
			const res = await uploadImg(ev)
			this.$emit('save', res.url)
			this.isLoading = false
		},
	},
}
</script>

<style>
img.upload {
	height: 200px;
	cursor: pointer;
}
img.loading {
	height: 200px;
}

label input {
	height: 0;
	width: 0;
}
</style>
