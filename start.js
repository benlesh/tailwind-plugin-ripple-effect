export function startRippleEffect() {
  const ac = new AbortController();

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target;

      if (target.classList.contains("ripple-stop")) {
        return;
      }

      if (target instanceof Element) {
        const toRipple = target.closest(".ripple-effect, .ripple-stop");

        if (toRipple && toRipple instanceof HTMLElement) {
          // If the closest thing we find is a ripple-stop, we don't want to search
          // deeper for a ripple-effect to ripple.
          if (toRipple.classList.contains("ripple-stop")) {
            return;
          }

          const [offsetX, offsetY] =
            toRipple === target
              ? [e.offsetX, e.offsetY]
              : [
                  e.clientX - toRipple.clientLeft,
                  e.clientY - toRipple.clientTop,
                ];
          toRipple.style.setProperty("--ripple-offset-x", `${offsetX}px`);
          toRipple.style.setProperty("--ripple-offset-y", `${offsetY}px`);

          console.log(
            getComputedStyle(toRipple).getPropertyValue("--ripple-color")
          );

          toRipple.classList.add("__ripple__active");

          toRipple.addEventListener(
            "animationend",
            () => {
              toRipple.classList.remove("__ripple__active");
            },
            { once: true, signal: ac.signal }
          );
        }
      }
    },
    { signal: ac.signal }
  );

  return () => {
    ac.abort();
  };
}
