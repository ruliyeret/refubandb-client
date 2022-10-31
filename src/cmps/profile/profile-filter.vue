<template>
	<section class="filter-orders">
		<el-input
			placeholder="Search"
			v-model="filterBy.name"
			clearable
			class="name-input"
			@input="setFilter"
		></el-input>

		<el-select
			v-model="filterBy.status"
			placeholder="Order Status"
			@change="setFilter"
			class="status-input"
			v-if="!isStaysFilter"
		>
			<el-option
				v-for="status in statusList"
				:key="status.label"
				:label="status.label"
				:value="status.value"
			>
			</el-option>
		</el-select>
	</section>
</template>

<script>
export default {
	props: { isStaysFilter: Boolean },
	data() {
		return {
			filterBy: { status: '', name: '' },
			statusList: [
				{ label: 'All', value: '' },
				{ label: 'Pending', value: 'pending' },
				{ label: 'Approved', value: 'approved' },
				{ label: 'Rejected', value: 'rejected' },
			],
		}
	},
	methods: {
		setFilter() {
			this.$emit('filter', this.filterBy)
		},
	},
}
</script>
