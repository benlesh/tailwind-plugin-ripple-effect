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

          toRipple.classList.remove("ripple-effect");

          void toRipple.offsetWidth; // trigger layout

          const [offsetX, offsetY] =
            toRipple === target
              ? [e.offsetX, e.offsetY]
              : [
                  e.clientX - toRipple.clientLeft,
                  e.clientY - toRipple.clientTop,
                ];
          toRipple.style.setProperty("--ripple-offset-x", `${offsetX}px`);
          toRipple.style.setProperty("--ripple-offset-y", `${offsetY}px`);
          toRipple.style.setProperty("--ripple-on", "1");
          toRipple.style.setProperty("--ripple-unset", "unset");
          toRipple.style.setProperty("--ripple-no-repeat", "no-repeat");

          toRipple.classList.add("ripple-effect"); // animate

          toRipple.addEventListener(
            "animationend",
            () => {
              toRipple.style.setProperty("--ripple-on", "0");
              toRipple.style.setProperty("--ripple-unset", "");
              toRipple.style.setProperty("--ripple-no-repeat", "");
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
