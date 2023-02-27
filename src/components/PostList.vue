<template>
  <div
    class="posts-component"
    v-lazy:loader="loadMorePosts3"
    v-if="!isPostsLoading"
  >
    <h3 class="posts-title">Directive in another component</h3>
    <TransitionGroup name="posts-transition">
      <div class="item lazy-item" v-for="post in posts" :key="post.id">
        <div class="item-id">{{ post.id }}</div>
        <div class="item-text">
          <div class="item-title">{{ post.title }}</div>
          <div class="item-body">{{ post.body }}</div>
        </div>
      </div>
    </TransitionGroup>
  </div>
  <!-- <div v-lazy="loadMorePosts3" class="observer"></div> -->
  <div class="loading" v-else>Loading...</div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
import lazyload from "@/directives/Vlazyload";
import axios from "axios";

import LazyLoader from "lazy_loading_vue";

export default {
  data() {
    return {
      isPostsLoading: false,
      posts: [],
      limit: 10,
      totalPosts: 0,
    };
  },
  components: { PostItem },
  directives: { lazyload, LazyLoader },
  methods: {
    async fetchPosts3() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _limit: this.limit,
            },
          }
        );
        this.totalPosts = response.headers["x-total-count"];
        this.posts = response.data;
      } catch (e) {
        alert("Error");
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts3() {
      try {
        if (this.limit <= this.totalPosts) {
          this.limit += 10;
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _limit: this.limit,
              },
            }
          );
          this.posts = [...response.data];
        }
      } catch (e) {
        alert("Error");
      } finally {
      }
    },
  },
  mounted() {
    this.fetchPosts3();
  },
};
</script>

<style scoped>
.posts-component {
  height: 40vh;
  width: 48%;
  margin-top: 20px;
  border: 1px solid;
  padding-bottom: 30px;
  height: 40vh;
  overflow: scroll;
  padding: 10px 0 20px;
}
.item {
  display: flex;
  align-items: center;
  column-gap: 10px;
  border: 1px solid;
  margin: 5px 10px;
  padding: 5px;
}
.item-text {
  text-align: center;
}
.item-title {
  margin-bottom: 5px;
}
.observer {
  height: 30px;
}
.loading {
  text-align: center;
}
.posts-transition-enter-active,
.posts-transition-leave-active {
  transition: all 1s ease;
}
.posts-transition-enter-from,
.posts-transition-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
