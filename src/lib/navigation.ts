export function getHash(href: string) {
  const index = href.indexOf("#");
  return index === -1 ? null : href.slice(index + 1);
}

function scheduleScroll(action: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(action);
  });
}

export function navigateToHash(href: string, reduceMotion = false): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const hash = getHash(href);
  const targetPath = href.split("#")[0] || "/";
  const currentPath = window.location.pathname || "/";
  const samePath =
    targetPath === currentPath ||
    (targetPath === "/" && currentPath === "/");

  if (!samePath) {
    return false;
  }

  const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

  if (!hash || hash === "home") {
    window.history.pushState(null, "", hash ? `${currentPath}#${hash}` : currentPath);
    scheduleScroll(() => window.scrollTo({ top: 0, behavior }));
    return true;
  }

  if (!document.getElementById(hash)) {
    return false;
  }

  window.history.pushState(null, "", `${currentPath}#${hash}`);
  scheduleScroll(() => {
    document.getElementById(hash)?.scrollIntoView({
      behavior,
      block: "start",
    });
  });
  return true;
}
