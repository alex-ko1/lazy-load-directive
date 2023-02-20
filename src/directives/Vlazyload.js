export default {
  mounted(el, binding) {
    const elId = Math.round(Math.random() * 100000);
    el.setAttribute("id", `list-${elId}`);

    let lastChild, slow, lazyLoader, lastChildCopy, updatedEl;

    if (binding.arg == "loader") {
      lazyLoader = document.createElement("div");
      lazyLoader.classList.add("lazyLoader");
      //lazyLoader.textContent = "Load...";
      lazyLoader.style.textAlign = "center";
      lazyLoader.style.color = "red";
      lazyLoader.style.margin = "10px auto";
    }

    // Using Intersection Observer API for lazy loading posts in custom directives.
    const options = {
      //root: null,
      rootMargin: "0px",
      threshold: 0.75,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        if (lazyLoader) {
          lastChildCopy = el.lastElementChild;
          el.append(lazyLoader);
        }
        binding.value();

        setTimeout(() => {
          observer.unobserve(lastChild);
          el.removeChild(lazyLoader);
          lastChild = el.lastElementChild;
          if (lastChildCopy == lastChild) {
            return;
          } else {
            observer.observe(lastChild);
          }
        }, 3000);
      }
    };
    const observer = new IntersectionObserver(callback, options);
    setTimeout(() => {
      // debugger;
      updatedEl = document.getElementById(`list-${elId}`);
      // console.log(updatedEl);
      if (updatedEl) {
        lastChild = updatedEl.lastElementChild;
        if (lastChild) {
          observer.observe(lastChild);
        }
      }
    }, 1000);

    // document.addEventListener("scroll", function () {
    //   if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
    //     binding.value();
    //   }
    // });
  },
};
