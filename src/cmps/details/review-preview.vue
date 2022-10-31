<template>
  <section class="review-preview">
    <section class="user">
      <img :src="review.by.imgUrl" />
      <div>
        <p class="review-name">{{ review.by.fullname }}</p>
        <p>{{ review.at | moment('from') }}</p>
      </div>
    </section>
    <p class="txt">{{ review.txt }}</p>
  </section>
</template>

<script>
export default {
  props: {
    review: Object,
  },
}
</script>
