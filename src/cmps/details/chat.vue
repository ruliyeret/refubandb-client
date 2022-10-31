<template>
	<section>
		<div class="chat-header">
			<div class="name">
				<p>{{ stay.name }}</p>
			</div>
			<div class="chat-controls">
				<button @click="toggleChat">
					<span class="material-icons-outlined">
						close
					</span>
				</button>
			</div>
		</div>
		<div class="chat-body">
			<ul>
				<li
					v-for="(msg, idx) in msgs"
					:key="idx"
					:class="{
						'msg-from': loggedinUserName !== msg.from,
						'msg-to': loggedinUserName !== msg.from,
					}"
				>
					<span>{{ msg.from }}:</span>{{ msg.txt }}
				</li>
			</ul>
			<p v-if="showTyping">{{ typingUsername }}:is typing...</p>
		</div>
		<div class="chat-footer">
			<form @submit.prevent="sendMsg">
				<input type="text" v-model="msg.txt" placeholder="Your message" @input="setIsTyping" />
				<button>
					<span class="material-icons-outlined">
						send
					</span>
				</button>
			</form>
		</div>
	</section>
</template>

<script>
import { socketService } from '@/services/socket.service.js'

export default {
	props: {
		stay: Object,
		msgHistory: Array,
	},
	data() {
		return {
			msg: { from: this.$store.getters.loggedinUser.username, txt: '' },
			msgs: [],
			topic: this.stay._id,
			timeout: undefined,
			isTyping: false,
			typingUsername: '',
		}
	},
	methods: {
		toggleChat() {
			this.$emit('close', false)
		},
		addMsg(msg) {
			this.msgs.push(msg)
		},
		sendMsg() {
			socketService.emit('chat newMsg', {
				msg: this.msg,
				stayId: this.stay._id,
			})

			this.msg = { from: this.$store.getters.loggedinUser.username, txt: '' }
		},
		setIsTyping() {
			if (this.isTyping === false) {
				this.isTyping = true
				socketService.emit('set typing', {
					isTyping: this.isTyping,
					username: this.loggedinUserName,
				})
				this.timeout = setTimeout(this.timeoutFunction, 700)
			} else {
				clearTimeout(this.timeout)
				this.timeout = setTimeout(this.timeoutFunction, 700)
			}
		},
		timeoutFunction() {
			this.isTyping = false
			socketService.emit('set typing', {
				isTyping: this.isTyping,
				username: this.loggedinUserName,
			})
		},
		msgClass(from) {
			return {
				'msg-from': this.loggedinUserName === from,
				'msg-to': this.loggedinUserName === from,
			}
		},
	},
	computed: {
		loggedinUserName() {
			return this.$store.getters.loggedinUser.username
		},
		showTyping() {
			return this.isTyping && this.typingUsername !== this.loggedinUserName
		},
	},
	created() {
		if (this.msgHistory) this.msgs.push(...this.msgHistory)
		socketService.emit('chat topic', this.topic)
		socketService.on('chat addMsg', this.addMsg)
		socketService.on('change typing', ({ isTyping, username }) => {
			this.isTyping = isTyping
			this.typingUsername = username
		})
	},
	destroyed() {
		socketService.off('chat addMsg', this.addMsg)
	},
}
</script>
