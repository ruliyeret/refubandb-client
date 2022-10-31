// login - frontend
socketService.emit('order-watch', userId)

// socket service - backend
socket.on('order-watch', userId => {
	socket.join(userId)
})

// order controller - backend
socketService.emitToUser({
	type: 'order-updated',
	data: updatedOrder,
	userId: updatedOrder.buyer._id,
})

// order store - frontend
socketService.on('order-updated', async order => {
	if (order.buyer._id === userId) {
		commit({ type: 'updateOrder', order })
		showMsg(`your order status was updated to ${order.status}`)
	}
})