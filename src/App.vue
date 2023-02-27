<template>
  <main>
    <div class="posts-1">
      <h3>Directive with loader</h3>
      <div
        class="post-list"
        v-if="!isPostsLoading"
        v-lazy:loader="loadMorePosts1"
      >
        <TransitionGroup name="posts-transition">
          <post-item
            v-for="post in posts1"
            :key="post.id"
            :post="post"
            ref="postCard"
          />
        </TransitionGroup>
      </div>
      <div class="loading" v-show="isPostsLoading">Loading...</div>
    </div>

    <div class="posts-2">
      <h3>Directive without loader</h3>
      <div class="post-list" v-lazy="loadMorePosts2" v-if="!isPostsLoading">
        <TransitionGroup name="posts-transition">
          <post-item v-for="post in posts2" :key="post.id" :post="post" />
        </TransitionGroup>
      </div>
      <div class="loading" v-else>Loading...</div>
      <!-- <div  ref="observer" class="observer"></div> -->
    </div>

    <post-list />

    <!-- <button @click="fetchPosts">Click</button> -->
  </main>
</template>

<script>
import PostItem from "./components/PostItem.vue";
import axios from "axios";
import lazyload from "@/directives/Vlazyload";
// import lazy from "lazy_loading_vue";
import PostList from "./components/PostList.vue";

export default {
  components: { PostItem, PostList },
  directives: { lazyload },
  data() {
    return {
      posts: [],
      isPostsLoading: false,
      limit: 10,
      totalPosts: 0,

      posts1: [],
      limitPosts1: 10,
      totalPosts1: 0,

      posts2: [],
      limitPosts2: 10,
      totalPosts2: 0,
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

        this.posts1 = response.data;
        this.totalPosts1 = response.headers["x-total-count"];
        this.posts2 = response.data;
        this.totalPosts2 = response.headers["x-total-count"];
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
    async loadMorePosts1() {
      try {
        if (this.limitPosts1 <= this.totalPosts1) {
          this.limitPosts1 += 10;
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _limit: this.limitPosts1,
              },
            }
          );
          this.posts1 = [...response.data];
        }
      } catch (e) {
        alert("Error");
      } finally {
      }
    },
    async loadMorePosts2() {
      try {
        if (this.limitPosts2 <= this.totalPosts2) {
          this.limitPosts2 += 10;
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _limit: this.limitPosts2,
              },
            }
          );
          this.posts2 = [...response.data];
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

<style>
main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
main > div {
  width: 48%;
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
.posts-1,
.posts-2 {
  margin-top: 20px;
  padding-bottom: 30px;
  border: 1px solid;
  height: 40vh;
  overflow: scroll;
}
</style>
