document.addEventListener("DOMContentLoaded", function () {
  Particles.init({
    selector: ".background",
    color: ["#03dac6", "#ff0266", "#000000"],
    connectParticles: true,
    responsive: [
      {
        breakpoint: 768,
        options: {
          color: ["#faebd7", "#03dac6", "#ff0266"],
          maxParticles: 43,
          connectParticles: false
        }
      }
    ]
  });

  class NavigationPage {
    constructor() {
      this.currentId = null;
      this.currentTab = null;
      this.tabContainerHeight = 70;
      this.lastScroll = 0;

      $(".nav-tab").click((event) => this.onTabClick(event, $(event.currentTarget)));
      $(window).scroll(() => this.onScroll());
      $(window).resize(() => this.onResize());
    }

    onTabClick(event, element) {
      event.preventDefault();
      const scrollTop = $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
      $("html, body").animate({ scrollTop: scrollTop }, 600);
    }

    onScroll() {
      this.checkHeaderPosition();
      this.findCurrentTabSelector();
      this.lastScroll = $(window).scrollTop();
    }

    onResize() {
      if (this.currentId) {
        this.setSliderCss();
      }
    }

    checkHeaderPosition() {
      const headerHeight = 75;
      const isScrolled = $(window).scrollTop() > headerHeight;
      $(".nav-container").toggleClass("nav-container--scrolled", isScrolled);

      const offset =
        $(".nav").offset().top +
        $(".nav").height() -
        this.tabContainerHeight -
        headerHeight;

      const isMoveUp =
        $(window).scrollTop() > this.lastScroll &&
        $(window).scrollTop() > offset;

      $(".nav-container").toggleClass("nav-container--move-up", isMoveUp);
      $(".nav-container").toggleClass("nav-container--top-first", isMoveUp);
      $(".nav-container").toggleClass("nav-container--top-second", isMoveUp);
    }

    findCurrentTabSelector() {
      let newCurrentId;
      let newCurrentTab;
      let self = this;

      $(".nav-tab").each(function () {
        let id = $(this).attr("href");
        let offsetTop = $(id).offset().top - self.tabContainerHeight;
        let offsetBottom =
          $(id).offset().top + $(id).height() - self.tabContainerHeight;

        if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
          newCurrentId = id;
          newCurrentTab = $(this);
        }
      });

      if (this.currentId !== newCurrentId || this.currentId === null) {
        this.currentId = newCurrentId;
        this.currentTab = newCurrentTab;
        this.setSliderCss();
      }
    }

    setSliderCss() {
      let width = 0;
      let left = 0;

      if (this.currentTab) {
        width = this.currentTab.width();
        left = this.currentTab.offset().left;
      }

      $(".nav-tab-slider").css({ width: width, left: left });
    }
  }

  new NavigationPage();
});
