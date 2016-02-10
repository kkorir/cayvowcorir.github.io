window.app = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    homeView: null,
    activeProjectView: null,
    activeCaseStudy: !1,
    border: $(".border"),
    init: function() {
        "use strict";
        this.homeView = new this.Views.HomeView, this.router = new this.Routers.ApplicationRouter, Backbone.history.start(), this.initOpenCloseMenu(), this.initMenuLinks(), this.refreshAnchors()
    },
    loadView: function(e) {
        return this.activeProjectView = e, this
    },
    isCaseStudyActive: function() {
        return this.activeCaseStudy
    },
    setCaseStudyActive: function(e) {
        return this.activeCaseStudy = e, !0
    },
    getActiveView: function() {
        return this.activeProjectView
    },
    positionsArticle: [],
    articles: [],
    initScrollAnims: function() {
        var e = this;
        this.articles = [], this.positionsArticle = [], this.articles = this.activeProjectView.caseStudyElem.find(".animation-on-scroll"), _.each(this.articles, function(t) {
            $article = $(t), e.positionsArticle.push($article.offset().top + $article.height() + parseInt($article.attr("data-start-margin")))
        }), $(window).on("scroll", function() {
            _.each(e.positionsArticle, function(t, n) {
                t < $(document).scrollTop() + e.homeView.windowHeight && ($(e.articles[n]).addClass("active"), delete e.positionsArticle[n])
            })
        })
    },
    leaveProject: function() {
        var e = this;
        $(".closeLayout").css("height", "100%"), $(".closeLayout").animate({
            opacity: 1
        }, 1e3, function() {
            var t = this;
            $(".border").removeClass("close"), $(".border").addClass("open"), app.activeProjectView.leaveProject(), $("#transition-social-coke").css({
                display: "none"
            }), app.homeView.homeProjectsContainer.addClass("no-transition"), app.homeView.homeProjectsContainer.css({
                top: ""
            }), app.homeView.homeProjectsContainer.removeClass("no-transition"), setTimeout(function() {
                $(t).animate({
                    opacity: 0
                }, 1e3, function() {
                    $(".button-menu").removeClass("close"), $(".button-menu").addClass("open"), e.activeProjectView.caseStudyElem.find(".animation-on-scroll").removeClass("active"), app.homeView.enableSlider(), app.activeCaseStudy = !1, $("body").addClass("userSelect"), $(".closeLayout").css({
                        height: "0%"
                    }), $(".border").removeClass("open"), $(".border").addClass("close")
                })
            }, 200)
        })
    },
    lastActivePage: null,
    menuOpen: !1,
    initOpenCloseMenu: function() {
        var e = this;
        $(".button-menu").on("click", function(t) {
            return t.preventDefault(), e.isCaseStudyActive() ? (app.router.navigate("/" + app.activeProjectView.getName()), e.leaveProject(), !1) : (e.openCloseMenu(), !1)
        }), $("body").click(function() {
            e.isMenuOpen() && e.openCloseMenu()
        })
    },
    openCloseMenu: function() {
        var e = $(".button-menu"),
            t = this;
        e.hasClass("open") ? (e.removeClass("open"), e.addClass("openMenu"), $("#borderTop").removeClass("close"), $("#borderTop").addClass("openMenu"), $("#borderBottom").removeClass("close"), $("#borderBottom").addClass("openMenu"), $("#borderLeft").removeClass("close"), $("#borderLeft").addClass("openMenu"), $("#borderRight").removeClass("close"), $("#borderRight").addClass("openMenu"), $("menu").addClass("openMenu"), $(".wrapper-projects-container").addClass("openMenu"), t.menuOpen = !0) : e.hasClass("openMenu") && (e.removeClass("openMenu"), e.addClass("open"), $("#borderTop").addClass("close"), $("#borderTop").removeClass("openMenu"), $("#borderBottom").addClass("close"), $("#borderBottom").removeClass("openMenu"), $("#borderLeft").addClass("close"), $("#borderLeft").removeClass("openMenu"), $("#borderRight").addClass("close"), $("#borderRight").removeClass("openMenu"), $("menu").removeClass("openMenu"), $(".wrapper-projects-container").removeClass("openMenu"), t.menuOpen = !1)
    },
    updateMenu: function(e) {
        var t = $("menu nav a");
        this.lastActivePage && this.lastActivePage.removeClass("active"), this.lastActivePage = $(t[e]), this.lastActivePage.addClass("active")
    },
    initMenuLinks: function() {
        var e = this;
        $("menu nav a").click(function() {
            e.updateMenu($(this).parent().index()), e.openCloseMenu()
        })
    },
    isMenuOpen: function() {
        return this.menuOpen
    },
    refreshAnchors: function() {
        var e = this;
        $(window).on("scroll", function() {
            _.each(e.activeProjectView.anchorsPositions, function(t, n) {
                $(document).scrollTop() > t ? $(".pagination." + e.activeProjectView.anchorsName + " ul li:nth-of-type(" + (n + 1) + ") a").addClass("active loaded") : $(document).scrollTop() == app.activeProjectView.caseStudyElem.height() - app.homeView.windowHeight ? $(".pagination." + e.activeProjectView.anchorsName + " ul li:nth-of-type(" + (n + 1) + ") a").addClass("active loaded") : $(".pagination." + e.activeProjectView.anchorsName + " ul li:nth-of-type(" + (n + 1) + ") a").removeClass("active loaded")
            })
        })
    }
}, $(window).load(function() {
    var e = $("#loader").attr("data-new");
    "true" == e ? setTimeout(function() {
        $("#loader").fadeOut(1e3), $("#home").addClass("entered"), app.init()
    }, 6e3) : setTimeout(function() {
        $("#loader").fadeOut(1e3), $("#home").addClass("entered"), app.init()
    }, 1e3)
});
app.Routers = app.Routers || {},
    function() {
        "use strict";
        app.Routers.ApplicationRouter = Backbone.Router.extend({
            routes: {
                ":project": "projectHandler",
                ":project/case-study": "caseStudyHandler"
            },
            projectHandler: function(e) {
                app.homeView.isValidProjectName(e) && (app.activeProjectView && app.activeCaseStudy && app.leaveProject(), this.loadView(e), app.homeView.slideToProject(e))
            },
            caseStudyHandler: function(e) {
                return app.isCaseStudyActive() && app.activeProjectView.leaveProject(), app.activeProjectView && app.activeProjectView.name == e ? (app.setCaseStudyActive(!0), app.activeProjectView.enterProjectAnim(), !0) : (this.loadView(e), app.activeProjectView.enterFromRouter(), void 0)
            },
            loadView: function(e) {
                switch (e) {
                    case "zolani":
                        app.loadView(new app.Views.zolani);
                        break;
                    case "partech":
                        app.loadView(new app.Views.partech);
                        break;
                    case "kiangunyi":
                        app.loadView(new app.Views.kiangunyi);
                        break;
                    case "pepeza":
                        app.loadView(new app.Views._pepeza);
                        break;
                    default:
                        app.loadView(null)
                }
            }
        })
    }();
app.Views = app.Views || {},
    function() {
        "use strict";
        app.Views.HomeView = Backbone.View.extend({
            homeProjectsContainer: $(".projects-container"),
            homeProjectClass: ".project",
            windowWidth: $(window).width(),
            windowHeight: $(window).height(),
            intervalDragProject: null,
            events: {
                "click .enter-button": "enterProjectEvent",
                "onkeydown document": "slideWithKeyboard"
            },
            initialize: function() {
                this.setProjectsSize(), this.initProjectsHome(), this.intervalDragProject = this.windowWidth / 5;
                var e = this;
                $(window).on("resize", function() {
                    e.windowResized()
                }), $(".enter-button").on("click", function(t) {
                    e.enterProjectEvent(t)
                }), $("body").bind("keyup", function(t) {
                    e.slideWithKeyboard(t, e)
                })
            },
            scrollTo: function() {
                $(".pagination ul li a").click(function(e) {
                    var t = $(this).attr("href");
                    e.preventDefault(), $("html, body").animate({
                        scrollTop: $(t).offset().top
                    }, 2e3)
                })
            },
            setProjectsSize: function() {
                var e = this.homeProjectsContainer.find(this.homeProjectClass),
                    t = e.length;
                this.homeProjectsContainer.css("width", this.windowWidth * t + "px"), e.css("width", this.windowWidth + "px"), e.css("height", this.windowHeight + "px"), $("#kiangunyiPlanet").css({
                    height: this.windowHeight / 4.5 + "px",
                    width: this.windowHeight / 4.5 + "px",
                    marginLeft: -(this.windowHeight / 4.5) / 2 + "px",
                    marginTop: -(this.windowHeight / 4.5 / 2 - 40) + "px"
                }), $("#kiangunyiSolar").css({
                    height: this.windowHeight / 1.38 + "px",
                    width: this.windowHeight / 1.38 + "px",
                    marginLeft: -(this.windowHeight / 1.38) / 2 + "px",
                    marginTop: -(this.windowHeight / 1.38 / 2 - 40) + "px"
                }), $("#kiangunyiFbPlanet").css({
                    height: this.windowHeight / 1.38 + "px",
                    width: this.windowHeight / 1.38 + "px",
                    marginLeft: -(this.windowHeight / 1.38) / 2 + "px",
                    marginTop: -(this.windowHeight / 1.38 / 2 - 40) + "px"
                }), $("#kiangunyiTwPlanet").css({
                    height: this.windowHeight / 1.38 + "px",
                    width: this.windowHeight / 1.38 + "px",
                    marginLeft: -(this.windowHeight / 1.38) / 2 + "px",
                    marginTop: -(this.windowHeight / 1.38 / 2 - 40) + "px"
                }), $("#kiangunyiLfPlanet").css({
                    height: this.windowHeight / 1.38 + "px",
                    width: this.windowHeight / 1.38 + "px",
                    marginLeft: -(this.windowHeight / 1.38) / 2 + "px",
                    marginTop: -(this.windowHeight / 1.38 / 2 - 40) + "px"
                }), $("#kiangunyiScPlanet").css({
                    height: this.windowHeight / 1.38 + "px",
                    width: this.windowHeight / 1.38 + "px",
                    marginLeft: -(this.windowHeight / 1.38) / 2 + "px",
                    marginTop: -(this.windowHeight / 1.38 / 2 - 40) + "px"
                }), $("#kiangunyiRssPlanet").css({
                    height: this.windowHeight / 1.38 + "px",
                    width: this.windowHeight / 1.38 + "px",
                    marginLeft: -(this.windowHeight / 1.38) / 2 + "px",
                    marginTop: -(this.windowHeight / 1.38 / 2 - 40) + "px"
                }), $("#kiangunyiPinPlanet").css({
                    height: this.windowHeight / 1.38 + "px",
                    width: this.windowHeight / 1.38 + "px",
                    marginLeft: -(this.windowHeight / 1.38) / 2 + "px",
                    marginTop: -(this.windowHeight / 1.38 / 2 - 40) + "px"
                }), $("#kiangunyi-introduction").css({
                    height: this.windowHeight + "px"
                }), $("#tdf-introduction").css({
                    height: this.windowHeight + "px"
                }), $("#partech-introduction").css({
                    height: this.windowHeight + "px"
                })
            },
            windowResized: function() {
                this.disableTransition(), this.windowWidth = $(window).width(), this.windowHeight = $(window).height(), this.intervalDragProject = this.windowWidth / 5, this.setProjectsSize();
                var e = -this.currentProject * this.windowWidth;
                this.homeProjectsContainer.css({
                    "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + e + "px, 0px, 0px)",
                    transform: "translate3d(" + e + "px, 0px, 0px)"
                }), this.enableTransition()
            },
            projectMapping: [],
            mousePositionX: null,
            currentProject: 0,
            isSliderActive: !0,
            initProjectsHome: function() {
                var e = this;
                this.scrollTo(), this.homeProjectsContainer.find("img").on("dragstart", function() {
                    return !1
                }), this.homeProjectsContainer.find("a").on("dragstart", function() {
                    return !1
                }), this.homeProjectsContainer.css("width", "12000px"), _.each($(this.homeProjectClass), function(t) {
                    e.projectMapping.push($(t).attr("data-project"))
                }), $(".noSlide").on("click", function(e) {
                    e.preventDefault()
                }), $(".noSlide").on("mousedown", function(t) {
                    e.disableSlider(t), $(document).on("mouseup", function(t) {
                        e.enableSlider(t), $(this).unbind("mouseup")
                    })
                }), $(this.homeProjectClass).on("mousedown", function(t) {
                    return e.isSliderActive ? (e.mousePositionX = t.clientX, e.homeProjectsContainer.addClass("no-transition"), $(document).on("mousemove", function(t) {
                        var n = -e.currentProject * e.windowWidth + t.clientX - e.mousePositionX;
                        e.homeProjectsContainer.css({
                            "-webkit-transform": "translate3d(" + n + "px, 0px, 0px)",
                            "-moz-transform": "translate3d(" + n + "px, 0px, 0px)",
                            "-o-transform": "translate3d(" + n + "px, 0px, 0px)",
                            "-ms-transform": "translate3d(" + n + "px, 0px, 0px)",
                            transform: "translate3d(" + n + "px, 0px, 0px)"
                        })
                    }), $(document).on("mouseup", function(t) {
                        $(this).unbind("mousemove"), $(this).unbind("mouseup"), setTimeout(function() {
                            e.homeProjectsContainer.removeClass("no-transition");
                            e.sliderHandler(t)
                        }, 40)
                    }), void 0) : !1
                }), app.updateMenu(this.getActiveProjectNumber())
            },
            sliderHandler: function(e) {
                var t = this.currentProject;
                return e.clientX > this.mousePositionX + 200 && 0 != this.currentProject ? this.currentProject-- : e.clientX < this.mousePositionX - 200 && this.currentProject != this.projectMapping.length - 1 && this.currentProject++, this.mousePositionX = 0, this.currentProject == t ? (this.slideToProject(this.getActiveProjectName()), !0) : (this.slideToCurrentProject(), void 0)
            },
            slideToCurrentProject: function() {
                this.slideToProject(this.getActiveProjectName()), app.updateMenu(this.getActiveProjectNumber()), Backbone.history.fragment = null, app.router.navigate(this.getActiveProjectName(), {
                    trigger: !0
                })
            },
            slideWithKeyboard: function(e, t) {
                var n = e.keyCode;
                return app.isCaseStudyActive() ? !0 : (37 == n && 0 != this.currentProject && t.currentProject--, 39 == n && this.currentProject != this.projectMapping.length - 1 && t.currentProject++, 13 == n && app.activeProjectView && "social-coke" != app.activeProjectView.getName() && app.activeProjectView.enterProjectAnim(), t.slideToCurrentProject(), void 0)
            },
            enterProjectEvent: function(e) {
                return e.preventDefault(), app.getActiveView().enterProjectAnim(), app.updateMenu(this.getActiveProjectNumber()), !1
            },
            closeProjectEvent: function() {
                return app.router.navigate("/" + this.getActiveProjectName(), {
                    trigger: !0
                }), !1
            },
            slideToProject: function(e) {
                this.currentProject = this.getProjectNumberByName(e), app.updateMenu(this.getActiveProjectNumber()), this.homeProjectsContainer.css({
                    "-webkit-transform": "translate3d(" + -this.currentProject * this.windowWidth + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + -this.currentProject * this.windowWidth + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + -this.currentProject * this.windowWidth + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + -this.currentProject * this.windowWidth + "px, 0px, 0px)",
                    transform: "translate3d(" + -this.currentProject * this.windowWidth + "px, 0px, 0px)"
                })
            },
            getActiveProjectNumber: function() {
                return this.currentProject
            },
            getActiveProjectName: function() {
                return this.projectMapping[this.currentProject]
            },
            getProjectNumberByName: function(e) {
                return _.indexOf(this.projectMapping, e)
            },
            isValidProjectName: function(e) {
                return _.indexOf(this.projectMapping, e) >= 0 ? !0 : !1
            },
            disableSlider: function() {
                this.homeProjectsContainer.removeClass("dragCursor"), this.isSliderActive = !1
            },
            enableSlider: function() {
                this.homeProjectsContainer.addClass("dragCursor"), this.isSliderActive = !0
            },
            disableTransition: function() {
                this.homeProjectsContainer.addClass("no-transition")
            },
            enableTransition: function() {
                this.homeProjectsContainer.removeClass("no-transition")
            }
        })
    }();
app.Views = app.Views || {},
    function() {
        "use strict";
        app.Views._pepeza = Backbone.View.extend({
            caseStudyContainer: $(".case-study-container"),
            caseStudyElem: $('section[data-case-study="pepeza"]'),
            title: "100ans de Tour",
            name: "pepeza",
            mousePositionX: 0,
            anchorsPositions: [],
            anchorsName: "tdf",
            initialize: function() {
                var e = app.homeView.windowHeight - 16,
                    t = e / 6;
                $("#date li").css("height", t), this.initEnterProjectAction()
            },
            dragCursor: $("#tdfDragCursor"),
            velo: $(".enter-elem img"),
            initEnterProjectAction: function() {
                var e = this,
                    t = Math.round(e.dragCursor.width()),
                    n = $("#tdfDrag").width();
                (app.homeView.windowWidth - n) / 2;
                var r, i;
                e.dragCursor.on("mousedown", function(s) {
                    i = s.clientX, r = parseInt(e.dragCursor.css("margin-left").split("px")[0]), $(document).on("mousemove", function(s) {
                        if (r = -(i - s.clientX), e.velo.addClass("no-transition"), e.dragCursor.addClass("no-transition"), r > n - t) return e.velo.removeClass("no-transition"), e.dragCursor.removeClass("no-transition"), e.velo.css("margin-left", n - t + "px"), e.dragCursor.css("margin-left", n - t + "px"), !1;
                        if (0 > r) return e.velo.removeClass("no-transition"), e.dragCursor.removeClass("no-transition"), e.velo.css("margin-left", "0px"), e.dragCursor.css("margin-left", "0px"), !1;
                        e.velo.css("margin-left", r + "px"), e.dragCursor.css("margin-left", r + "px");
                        var o = $("#tdfDragCursor").css("margin-left").replace("px", "");
                        $("#fixie-wheel1").css({
                            "-webkit-transform": "rotate(" + o + "deg)",
                            "-moz-transform": "rotate(" + o + "deg)",
                            "-ms-transform": "rotate(" + o + "deg)",
                            transform: "rotate(" + o + "deg)"
                        }), $("#fixie-wheel2").css({
                            "-webkit-transform": "rotate(" + o + "deg)",
                            "-moz-transform": "rotate(" + o + "deg)",
                            "-ms-transform": "rotate(" + o + "deg)",
                            transform: "rotate(" + o + "deg)"
                        }), $("#fixie-pedal").css({
                            "-webkit-transform": "rotate(" + o + "deg)",
                            "-moz-transform": "rotate(" + o + "deg)",
                            "-ms-transform": "rotate(" + o + "deg)",
                            transform: "rotate(" + o + "deg)"
                        })
                    }), $(document).on("mouseup", function() {
                        if (e.velo.removeClass("no-transition"), e.dragCursor.removeClass("no-transition"), r = parseInt(e.dragCursor.css("margin-left").split("px")[0]), $(document).unbind("mouseup"), $(document).unbind("mousemove"), r > n - t - 50) return app.homeView.disableSlider(), e.dragCursor.css("margin-left", n - t + "px"), e.velo.css("margin-left", n - t + "px"), $(".border").toggleClass("close open"), $("#borderTop").on("webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionend", function() {
                            $(this).unbind("webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionend"), window.location.assign("/pepeza/case-study-pepeza"), e.enterProjectAnim()
                        }), !1;
                        e.dragCursor.css("margin-left", "0px"), e.velo.css("margin-left", "0px");
                        for (var i = $("#tdfDragCursor").css("margin-left").replace("px", ""); i > 0;) $("#fixie-wheel1").css({
                            "-webkit-transform": "rotate(" + i + "deg)",
                            "-moz-transform": "rotate(" + i + "deg)",
                            "-ms-transform": "rotate(" + i + "deg)",
                            transform: "rotate(" + i + "deg)"
                        }), $("#fixie-wheel2").css({
                            "-webkit-transform": "rotate(" + i + "deg)",
                            "-moz-transform": "rotate(" + i + "deg)",
                            "-ms-transform": "rotate(" + i + "deg)",
                            transform: "rotate(" + i + "deg)"
                        }), $("#fixie-pedal").css({
                            "-webkit-transform": "rotate(" + i + "deg)",
                            "-moz-transform": "rotate(" + i + "deg)",
                            "-ms-transform": "rotate(" + i + "deg)",
                            transform: "rotate(" + i + "deg)"
                        }), i--
                    })
                })
            },
            enterProjectAnim: function() {
                var e = this;
                $("#date").addClass("active"), $(".border").removeClass("close"), $(".border").addClass("open"), this.animateDate(e.enterProject, !0)
            },
            etapesIncrease: function() {
                var e = $("#nb-etapes.active"),
                    t = $("#nb-parcours.active"),
                    n = $("#nb-participants.active");
                $({
                    someValue: 0
                }).animate({
                    someValue: 2001
                }, {
                    duration: 2e3,
                    easing: "swing",
                    step: function() {
                        e.text(Math.round(this.someValue))
                    }
                }), $({
                    someValue: 0
                }).animate({
                    someValue: 426068
                }, {
                    duration: 2e3,
                    easing: "swing",
                    step: function() {
                        t.text(Math.round(this.someValue))
                    }
                }), $({
                    someValue: 0
                }).animate({
                    someValue: 13947
                }, {
                    duration: 2e3,
                    easing: "swing",
                    step: function() {
                        n.text(Math.round(this.someValue))
                    }
                })
            },
            dataIncrease: function() {
                var e = this,
                    t = !1;
                $(window).on("scroll", function() {
                    $("#nb-etapes").hasClass("active") && 0 == t && (e.etapesIncrease(), t = !0)
                })
            },
            animateDate: function(e, t) {
                var n = this,
                    r = $("#date").find("li"),
                    i = 0,
                    s = 7,
                    o = setInterval(function() {
                        return i == r.length ? (clearInterval(o), e && e.call(n), !0) : (t ? $(r[i]).removeClass("flipOn") : $(r[i]).addClass("flipOn"), i++, !0)
                    }, s)
            },
            enterProject: function() {
                $(".button-menu").removeClass("open"), $(".button-menu").addClass("close"), $("body").removeClass("userSelect"), app.setCaseStudyActive(!0), $("#tdfBgContent").css("display", "none"), this.caseStudyElem.css("display", "block"), $(".pagination.tdf").addClass("active"), this.animateDate(function() {
                    app.homeView.homeProjectsContainer.css("display", "none"), $("#date").removeClass("active")
                }, !1), app.initScrollAnims(), this.dataIncrease(), this.refreshAnchors(), app.refreshAnchors(), ga("send", "event", "Case study", "Click", "100ans de tour case study")
            },
            refreshAnchors: function() {
                this.anchorsPositions = [$("#tdf-introduction").offset().top - 1, $("#tdf-context").offset().top - 1, $("#tdf-data").offset().top - 1, $("#tdf-design").offset().top - 1, $("#tdf-thanks").offset().top - 1, $("#tdf-other").offset().top - 1]
            },
            leaveProject: function() {
                var e = this;
                $("#tdfBgContent").css("display", "block"), app.homeView.homeProjectsContainer.css("display", "block"), e.caseStudyElem.css("display", "none"), $(".pagination.tdf").removeClass("active"), e.velo.css("margin-left", "0px"), e.dragCursor.css("margin-left", "0px"), $("body").addClass("userSelect")
            },
            enterFromRouter: function() {
                $(".border").removeClass("close"), $(".border").addClass("open"), app.homeView.homeProjectsContainer.css("display", "none"), this.caseStudyElem.css("display", "block"), this.enterProject()
            },
            disableTransition: function(e) {
                e.removeClass("no-transition")
            },
            enableTransition: function(e) {
                e.addClass("no-transition")
            },
            getName: function() {
                return this.name
            }
        })
    }();
app.Views = app.Views || {},
    function() {
        "use strict";
        app.Views.partech = Backbone.View.extend({
            el: $(".case-study-container"),
            caseStudyContainer: $(".case-study-container"),
            caseStudyElem: $('section[data-case-study="partech"]'),
            template: "",
            title: "Partech",
            name: "partech",
            dragCursorPartech: $(".dragCursorPartech"),
            partechScreen: $("#partechScreenImg"),
            anchorsPositions: [],
            anchorsName: "partech",
            dragScreen: function() {
                var e = this,
                    t = Math.round(e.dragCursorPartech.width()),
                    n = $(".toDrag").width() - 22;
                (app.homeView.windowWidth - n) / 2;
                var r, i, s = 990 / n;
                e.dragCursorPartech.on("mousedown", function() {
                    i = parseInt(e.dragCursorPartech.css("margin-left").split("px")[0]), r = parseInt(e.dragCursorPartech.css("margin-left").split("px")[0]), $(document).on("mousemove", function(i) {
                        var o = $(window).width();
                        return r = o > n ? i.clientX - (o - n) / 2 : i.clientX, r > n - t ? (e.dragCursorPartech.css("margin-left", n - t + "px"), !1) : 0 > r ? (e.dragCursorPartech.css("margin-left", "0px"), !1) : (e.dragCursorPartech.css("margin-left", r + "px"), e.partechScreen.css("margin-left", -r / s + "px"), void 0)
                    }), $(document).on("mouseup", function() {
                        r = parseInt(e.dragCursorPartech.css("margin-left").split("px")[0]), $(document).unbind("mouseup"), $(document).unbind("mousemove"), e.dragCursorPartech.css("margin-left", r + "px"), e.partechScreen.css("margin-left", -r / s + "px")
                    })
                })
            },
            refreshAnchors: function() {
                this.anchorsPositions = [$("#partech-introduction").offset().top - 1, $("#partech-client").offset().top - 1, $("#partech-dragScreen").offset().top - 1, $("#partech-sketch").offset().top - 1, $("#partech-mobile").offset().top - 1, $("#partech-ui").offset().top - 1]
            },
            initialize: function() {
                $("#partechProject .enter-button").on("click", this.enterProjectAnim)
            },
            enterProjectAnim: function() {
                var e = this;
                app.homeView.disableSlider(), $(".border").removeClass("close"), $(".border").addClass("open"), app.homeView.disableSlider(), $(".partechEnterLayout").addClass("active"), $(".partechEnterLayout").bind("webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionend", function() {
                    $(this).unbind("webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionend"), app.router.navigate("/" + e.getName() + "/case-study", {
                        trigger: !1
                    }), app.homeView.homeProjectsContainer.css("display", "none"), e.caseStudyElem.css({
                        display: "block"
                    }), setTimeout(function() {
                        $("#partech-introduction").addClass("active"), clearTimeout(this)
                    }, 100), e.enterProject()
                })
            },
            leaveProject: function() {
                var e = this;
                $(".partechEnterLayout").removeClass("active"), $("#partech-introduction").removeClass("active"), app.homeView.homeProjectsContainer.css("display", "block"), $(".pagination.partech").removeClass("active"), e.caseStudyElem.css("display", "none"), $("body").addClass("userSelect")
            },
            enterFromRouter: function() {
                $(".border").removeClass("close"), $(".border").addClass("open"), this.caseStudyElem.css({
                    display: "block"
                }), this.enterProject(), app.homeView.homeProjectsContainer.css("display", "none"), $("#partech-introduction").addClass("active")
            },
            enterProject: function() {
                $("body").removeClass("userSelect"), $(".button-menu").removeClass("open"), $(".button-menu").addClass("close"), app.setCaseStudyActive(!0), $("body").removeClass("userSelect"), $(".pagination.partech").addClass("active"), app.initScrollAnims(), this.dragScreen(), this.refreshAnchors(), app.refreshAnchors()
            },
            getName: function() {
                return this.name
            }
        })
    }();
app.Views = app.Views || {},
    function() {
        "use strict";
        app.Views.zolani = Backbone.View.extend({
            caseStudyContainer: $(".case-study-container"),
            caseStudyElem: $('section[data-case-study="zolani"]'),
            title: "Zolani",
            name: "Zolani",
            model: null,
            pseudoPositions: {},
            $pseudoSocialCoke: $("#pseudoSocialCoke"),
            widthPseudo: 12,
            $socialCokeForm: $("#socialCokeForm"),
            $inputText: $("#socialCokeForm").find('input[type="text"]'),
            anchorsPositions: [],
            anchorsName: "zolani",
            initialize: function() {
                this.initEnterProjectAction()
            },
            initEnterProjectAction: function() {
                var e, t = this;
                this.pseudoPositions.top = t.$inputText.offset().top, this.$socialCokeForm.submit(function(n) {
                    return n.preventDefault(), e = t.$inputText.val() ? "@" + t.$inputText.val() : "@pseudo", t.$pseudoSocialCoke.empty(), t.$pseudoSocialCoke.html(e), t.enterProjectAnim(), !1
                })
            },
            refreshAnchors: function() {
                this.anchorsPositions = [$("#zolani-introduction").offset().top - 1, $("#zolani-concept").offset().top - 1, $("#socialCoke-idea").offset().top - 1, $("#socialCoke-interest").offset().top - 1, $("#socialCoke-universe").offset().top - 1, $("#socialCoke-bottle").offset().top - 1, $("#socialCoke-madeWith").offset().top - 1]
            },
            enterProjectAnim: function() {
                var e = this;
                $(".border").removeClass("close"), $(".border").addClass("open"), $("#zolani").css({
                    display: "block"
                }), app.homeView.disableTransition(), app.router.navigate("/" + this.name + "/case-study", {
                    trigger: !1
                }), e.enterProject(), app.homeView.homeProjectsContainer.animate({
                    top: 2 * -app.homeView.windowHeight
                }, 2e3, function() {
                    app.homeView.enableTransition()
                }), this.caseStudyElem.css({
                    display: "block",
                    marginTop: 2 * app.homeView.windowHeight
                }), e.caseStudyElem.animate({
                    marginTop: "0px"
                }, 2e3, function() {
                    e.refreshAnchors()
                })
            },
            enterProject: function() {
                $("body").removeClass("userSelect"), $(".button-menu").removeClass("open"), $(".button-menu").addClass("close"), app.setCaseStudyActive(!0), $(".pagination.socialCoke").addClass("active"), app.initScrollAnims(), this.refreshAnchors(), app.refreshAnchors(), ga("send", "event", "Case study", "Click", "Social case study")
            },
            leaveProject: function() {
                var e = this;
                app.homeView.homeProjectsContainer.css({
                    display: "block"
                }), $(".pagination.socialCoke").removeClass("active"), e.caseStudyElem.css("display", "none"), $("body").addClass("userSelect")
            },
            enterFromRouter: function() {
                $(".border").removeClass("close"), $(".border").addClass("open"), this.$pseudoSocialCoke.html("@pseudo"), this.caseStudyElem.css({
                    display: "block",
                    marginTop: 2 * app.homeView.windowHeight
                }), this.enterProject(), app.homeView.homeProjectsContainer.css("display", "none"), $("#transition-social-coke").css("display", "block"), this.caseStudyElem.css({
                    marginTop: 0
                }), this.refreshAnchors()
            },
            getName: function() {
                return this.name
            }
        })
    }();
app.Views = app.Views || {},
    function() {
        "use strict";
        app.Views.kiangunyi = Backbone.View.extend({
            caseStudyContainer: $(".case-study-container"),
            caseStudyElem: $('section[data-case-study="kiangunyi"]'),
            title: "Kiangunyi",
            name: "kiangunyi",
            anchorsPositions: [],
            anchorsName: "kiangunyi",
            initialize: function() {},
            initEnterProjectAction: function() {},
            enterProjectAnim: function() {
                var e = this;
                app.homeView.disableSlider(), $("#kiangunyiProject").addClass("closed"), $(".border").removeClass("close"), $(".border").addClass("open"), app.homeView.disableSlider(), $("#borderLeft").bind("webkitTransitionEnd msTransitionEnd oTransitionEnd transitionend", function() {
                    $(this).unbind("webkitTransitionEnd msTransitionEnd oTransitionEnd transitionend"), app.router.navigate("/" + e.name + "/case-study", {
                        trigger: !1
                    }), app.homeView.homeProjectsContainer.css("display", "none"), e.caseStudyElem.css({
                        display: "block"
                    }), setTimeout(function() {
                        $("#kiangunyi-introduction").addClass("active"), clearTimeout(this)
                    }, 100), e.enterProject()
                })
            },
            refreshAnchors: function() {
                this.anchorsPositions = [$("#kiangunyi-introduction").offset().top - 1, $("#kiangunyi-concept").offset().top - 1, $("#kiangunyi-interface").offset().top - 1, $("#kiangunyi-element").offset().top - 1, $("#kiangunyi-madeWith").offset().top - 1]
            },
            leaveProject: function() {
                $("#kiangunyiProject").removeClass("closed"), $("#kiangunyi-introduction").removeClass("active"), app.homeView.homeProjectsContainer.css("display", "block"), $(".pagination.kiangunyi").removeClass("active"), this.caseStudyElem.css("display", "none"), $("body").addClass("userSelect")
            },
            enterFromRouter: function() {
                $(".border").removeClass("close"), $(".border").addClass("open"), this.caseStudyElem.css({
                    display: "block"
                }), this.enterProject(), app.homeView.homeProjectsContainer.css("display", "none"), $("#kiangunyi-introduction").addClass("active")
            },
            enterProject: function() {
                $(".button-menu").removeClass("open"), $(".button-menu").addClass("close"), app.setCaseStudyActive(!0), $("body").removeClass("userSelect"), $(".pagination.kiangunyi").addClass("active"), app.initScrollAnims(), this.refreshAnchors(), app.refreshAnchors()
            },
            getName: function() {
                return this.name
            }
        })
    }();
$("#parallax").parallax();
var s = skrollr.init({
    edgeStrategy: "set",
    easing: {
        WTF: Math.random,
        inverted: function(e) {
            return 1 - e
        }
    }
});


