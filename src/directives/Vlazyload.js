export default {
  mounted(el, binding) {
    // If you use loader

    let lastChildItem, lazyLoader, lastChildItemCopy;
    if (binding.arg == "loader") {
      lazyLoader = document.createElement("div");
      lazyLoader.classList.add("vue-lazy-loader");
      lazyLoader.textContent = "Load...";
    }
    const options = {
      //root: null,
      rootMargin: "0px",
      threshold: 0.75,
    };
    const callback = async (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry);
        }
      });
      if (entries[0].isIntersecting) {
        lastChildItemCopy =
          el.querySelectorAll(".lazy-item")[
            el.querySelectorAll(".lazy-item").length - 1
          ];
        if (lazyLoader) {
          el.append(lazyLoader);
        }
        observer.unobserve(lastChildItem);
        await binding.value();

        // setTimeout(() => {
        if (lazyLoader) {
          el.removeChild(lazyLoader);
        }
        lastChildItem =
          el.querySelectorAll(".lazy-item")[
            el.querySelectorAll(".lazy-item").length - 1
          ];
        if (lastChildItemCopy == lastChildItem) {
          return;
        } else {
          observer.observe(lastChildItem);
        }
        // }, 3000);
      }
    };
    const observer = new IntersectionObserver(callback, options);

    setTimeout(() => {
      if (el.querySelector(".lazy-item")) {
        lastChildItem =
          el.querySelectorAll(".lazy-item")[
            el.querySelectorAll(".lazy-item").length - 1
          ];
        if (lastChildItem) {
          observer.observe(lastChildItem);
        }
      } else {
        setTimeout(() => {
          if (lastChildItem) {
            lastChildItem =
              el.querySelectorAll(".lazy-item")[
                el.querySelectorAll(".lazy-item").length - 1
              ];
            observer.observe(lastChildItem);
          }
        }, 4000);
      }
    }, 1000);
  },
};
