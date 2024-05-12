/*******************************************
 * Template Name: Unigine
 * Updated: May 2024
 * Author: Ghostcode
 * PSD Designer: GhostCode
 *******************************************/
//

(function () {
  ("use strict");

  /** Select DOM Elements
   * @description Helper function to select DOM elements
   * @author Naim Zaaraoui
   * @param {string} selector - Element to select
   * @param {boolean} all [false] - Specify whether select all matched elements or only first one
   */
  function select(selector, all = false) {
    selector = selector.trim();
    return all
      ? [...document.querySelectorAll(selector)]
      : document.querySelector(selector);
  }

  /***
   * Attach an event listener to an element
   ***/

  function on(selector, eventType, listener, all = false) {
    let element =
      typeof selector === "string" ? select(selector, all) : selector;
    if (element) {
      all || element.length > 1
        ? element.forEach((ele) => ele.addEventListener(eventType, listener))
        : element.addEventListener(eventType, listener);
    }
  }

  function scrollto(selector) {
    const headerOffset = select("[data-header]").offsetHeight;
    if (selector) {
      window.scrollTo({
        top: selector.offsetTop - headerOffset,
        behavior: "smooth",
      });
    }
  }

  /***
   * Progress Bar
   ***/

  const progressBar = select(".progress-bar");

  on(window, "scroll", () => {
    let max = document.body.scrollHeight - innerHeight;
    progressBar.style.width = `${(scrollY / max) * 100}%`;
  });

  /***
   * Header
   * Header and back top btn will be active after scrolled down to 100px of screen
   ***/

  const header = select("[data-header]"),
    backTopBtn = select("[data-back-top-btn]");

  const activeEl = function () {
    if (scrollY > 100) {
      header.classList.add("is-active");
      backTopBtn.classList.add("is-active");
    } else {
      header.classList.remove("is-active");
      backTopBtn.classList.remove("is-active");
    }
  };

  on(window, "scroll", activeEl);

  /***
   * Toggle navbar
   ***/

  const navToggler = select("[data-nav-toggler]");

  on(navToggler, "click", function () {
    this.classList.toggle("is-active");
  });

  /***
   * Scroll to target section when click on a nav link
   ***/

  const navLinks = select("[data-nav-link]", true);

  on(navLinks, "click", function (e) {
    const section = this.dataset.scrollto;
    navToggler.classList.toggle("is-active");

    e.preventDefault();
    scrollto(select(section));
  });

  /***
   * Button hover ripple effect
   ***/

  const buttonHoverRipple = function (event) {
    this.style.setProperty("--_top", `${event.offsetY}px`);
    this.style.setProperty("--_left", `${event.offsetX}px`);
  };

  on("[data-btn]", "mouseover", buttonHoverRipple, true);

  /***
   * Back to top button
   ***/
  on(backTopBtn, "click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /***
   * Custom cursor
   ***/

  const cursor = select("[data-cursor]");
  const hoverElements = [...select("button", true), ...select("a", true)];

  const cursorMove = function (event) {
    cursor.style.insetBlockStart = `${event.clientY}px`;
    cursor.style.insetInlineStart = `${event.clientX}px`;
  };

  on(window, "mousemove", cursorMove);
  on(hoverElements, "mouseover", function () {
    cursor.classList.add("is-hovered");
  });
  on(hoverElements, "mouseout", function () {
    cursor.classList.remove("is-hovered");
  });

  /***
   * Scroll Reveal
   ***/

  const revealElements = select("[data-reveal]", true);
  const options = {
    root: null,
    rootMargin: "-50px",
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("revealed", entry.isIntersecting);
      if (entry.isIntersecting) {
        scrollObserver.unobserve(entry.target);
      }
    });
  }, options);
  revealElements.forEach((revealElement) => {
    scrollObserver.observe(revealElement);
  });
})();
