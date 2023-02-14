export default {
  mounted(el, binding) {
    // Using Intersection Observer API for lazy loading posts in custom directives.
    const options = {
      //root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        console.log(el);
        binding.value();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);

    // document.addEventListener("scroll", function () {
    //   if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
    //     binding.value();
    //   }
    // });
  },
};
