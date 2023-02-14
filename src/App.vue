<template>
  <main>
    <div class="posts-1">
      <div class="post-list" v-show="!isPostsLoading">
        <TransitionGroup name="posts-transition">
          <post-item
            v-for="post in posts"
            :key="post.id"
            :post="post"
            ref="postCard"
          />
        </TransitionGroup>
        <div v-lazy="loadMorePosts" ref="observerBlock" class="observer"></div>
      </div>
      <div class="loading" v-show="isPostsLoading">Loading...</div>
    </div>
    <!-- <div class="posts-2">
      <div class="post-list" v-if="!isPostsLoading">
        <TransitionGroup name="posts-transition">
          <post-item v-for="post in posts" :key="post.id" :post="post" />
        </TransitionGroup>
      </div>
      <div class="loading" v-else>Loading...</div>
      <div v-lazy="loadMorePosts" ref="observer" class="observer"></div>
    </div> -->
    <!-- <button @click="fetchPosts">Click</button> -->
  </main>
</template>

<script>
import PostItem from "./components/PostItem.vue";
import axios from "axios";
import lazy from "@/directives/Vlazyload";

export default {
  components: { PostItem },
  directives: { lazy },
  data() {
    return {
      posts: [],
      posts1: [],
      posts2: [],
      isPostsLoading: false,
      limit: 10,
      totalPosts: 0,
    };
  },
  methods: {
    async fetchPosts() {
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
    async loadMorePosts() {
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
    this.fetchPosts();

    // Using Intersection Observer API for lazy loading posts.
    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.posts.length < this.totalPosts) {
    //     this.loadMorePosts();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observerBlock);
  },
};
</script>

<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
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

.observer {
  height: 30px;
  /* background: green; */
}
/* .posts-1 {
  overflow: scroll;
} */
/* .posts-1,
.posts-2 {
  border: 1px solid;
  height: 40vh;
  overflow: scroll;
} */
</style>
