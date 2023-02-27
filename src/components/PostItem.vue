<template>
  <div class="item lazy-item">
    <div class="item-id">{{ post.id }}</div>
    <div class="item-text">
      <div class="item-title">{{ post.title }}</div>
      <div class="item-body">{{ post.body }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.item {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border: 3px solid #007fae;
  border-radius: 15px;
  font-size: 1.2em;
  font-family: sans-serif;
  column-gap: 20px;
  align-items: center;
}
.item:not(:first-child) {
  margin-top: 20px;
}
.item-title {
  text-align: center;
  margin-bottom: 5px;
  font-style: italic;
  font-size: 0.9em;
}
.item-body {
  width: 90%;
  font-size: 0.8em;
  margin: 0 auto;
  text-align: center;
}
</style>
