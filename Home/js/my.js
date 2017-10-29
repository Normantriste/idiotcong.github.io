// JavaScript Document

$(function() {
    var num = 0;
    var timer = null;
    // $('.sc').css('top','-100%');
    // $('.screen2').removeClass('no');

    $('.screen1').removeClass('no')


    ;
    (function() {
        $('.enter p').click(function(e) {
            $('.sc').stop().animate({ top: -100 + '%' });
            $('.all li').eq(1).addClass('cur01').siblings().removeClass('cur01');
            $('.gps li').eq(1).addClass('cur').siblings().removeClass('cur');
        });
    })();


    ;
    (function() {

        $('.gps li').click(function(e) {
            var index = $(this).index();
            $('.sc').stop().animate({ top: -100 * index + '%' });
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.all li').eq(index).addClass('cur01').siblings().removeClass('cur01');
            $('.sc>div').eq(index).removeClass('no').siblings().addClass('no')
            num = index;
        });

        $('.all li').click(function(e) {
            var index = $(this).index();
            $('.sc').stop().animate({ top: -100 * index + '%' });
            $(this).addClass('cur01').siblings().removeClass('cur01');
            $('.gps li').eq(index).addClass('cur').siblings().removeClass('cur');
            $('.sc>div').eq(index).removeClass('no').siblings().addClass('no')
            num = index;
        });

    })();



    ;
    (function() {

        $(window).mousewheel(function(e, d) {
            clearTimeout(timer)
            timer = setTimeout(function() {

                num -= d;
                if (num > 4) { num = 4 };
                if (num < 0) { num = 0 };
                $('.gps li').eq(num).addClass('cur').siblings().removeClass('cur');
                $('.all li').eq(num).addClass('cur01').siblings().removeClass('cur01');
                $('.sc').stop().animate({ top: -100 * num + '%' });
                $('.sc>div').eq(num).removeClass('no').siblings().addClass('no')

            }, 300)
        })

    })();


    ;
    (function() {

        $('figure').click(function(e) {
            if ($('audio').get(0).paused == true) {
                $('audio').get(0).play();
                $(this).css({ 'animation-play-state': 'running' })
            } else {
                $('audio').get(0).pause();
                $(this).css({ 'animation-play-state': 'paused' })
            }
        });

    })();



const button = document.querySelector('.button');
const submit = document.querySelector('.submit');

function toggleClass() {
    this.classList.toggle('active');
}

function addClass() {
    this.classList.add('finished');
    window.location.href="../"
}

button.addEventListener('click', toggleClass);
button.addEventListener('transitionend', toggleClass);
button.addEventListener('transitionend', addClass);




























    ;
    (function($) {

        //定义PicCarousel类
        var PicCarousel = (function() {

            //定义PicCarousel的构造函数
            function PicCarousel(element, options) {
                this.settings = $.extend(true, $.fn.PicCarousel.defaults, options || {});
                this.element = element;
                this.init();
            }

            //定义PicCarousel的方法
            PicCarousel.prototype = {
                /*说明：初始化插件*/
                init: function() {
                    var me = this;
                    me.poster = me.element;
                    me.posterItemMain = me.poster.find("ul.poster-list");
                    me.nextBtn = me.poster.find("div.poster-next-btn");
                    me.prevBtn = me.poster.find("div.poster-prev-btn");
                    me.posterItems = me.poster.find("li.poster-item");

                    if (me.posterItems.size() % 2 == 0) {
                        me.posterItemMain.append(me.posterItems.ep(0).clone());
                        me.posterItems = me.posterItemMain.children;
                    }

                    me.posterFirstItem = me.posterItems.first();
                    me.posterLastItem = me.posterItems.last();
                    me.rotateFlag = true;

                    //设置配置参数值
                    me.setSettingValue();
                    me.setPosterPost();

                    me.nextBtn.click(function() {
                        if (me.rotateFlag) {
                            me.rotateFlag = false;
                            me.carouseRotate("left");
                        };
                    });

                    me.prevBtn.click(function() {
                        if (me.rotateFlag) {
                            me.rotateFlag = false;
                            me.carouseRotate("right");
                        };
                    });

                    //是否开启自动播放
                    if (me.settings.autoPlay) {
                        me.autoPlay();
                        me.poster.hover(function() {
                            window.clearInterval(me.timer);
                        }, function() {
                            me.autoPlay();
                        });
                    }
                },

                //自动播放方法
                autoPlay: function() {
                    var me = this;
                    me.timer = window.setInterval(function() {
                        me.nextBtn.click();
                    }, me.settings.delay);
                },

                //旋转方法
                carouseRotate: function(dir) {
                    var me = this;
                    var zIndexArr = [];
                    if (dir === "left") {
                        me.posterItems.each(function() {
                            var self = $(this),
                                prev = self.prev().get(0) ? self.prev() : me.posterLastItem,
                                width = prev.width(),
                                height = prev.height(),
                                zIndex = prev.css("zIndex"),
                                opacity = prev.css("opacity"),
                                left = prev.css("left"),
                                top = prev.css("top");
                            zIndexArr.push(zIndex);
                            self.animate({
                                width: width,
                                height: height,
                                opacity: opacity,
                                left: left,
                                top: top
                            }, me.settings.speed, function() {
                                me.rotateFlag = true;
                            });
                        });
                        me.posterItems.each(function(i) {
                            $(this).css("zIndex", zIndexArr[i]);
                        })
                    } else if (dir === "right") {
                        me.posterItems.each(function() {
                            var self = $(this),
                                next = self.next().get(0) ? self.next() : me.posterFirstItem,
                                width = next.width(),
                                height = next.height(),
                                zIndex = next.css("zIndex"),
                                opacity = next.css("opacity"),
                                left = next.css("left"),
                                top = next.css("top");
                            zIndexArr.push(zIndex);
                            self.animate({
                                width: width,
                                height: height,
                                opacity: opacity,
                                left: left,
                                top: top
                            }, me.settings.speed, function() {
                                me.rotateFlag = true;
                            });
                        });
                        me.posterItems.each(function(i) {
                            $(this).css("zIndex", zIndexArr[i]);
                        })
                    }
                },

                //设置剩余的帧的位置关系
                setPosterPost: function() {
                    var me = this;
                    var sliceItems = me.posterItems.slice(1),
                        sliceSize = sliceItems.size() / 2,
                        rightSlice = sliceItems.slice(0, sliceSize),
                        level = Math.floor(me.posterItems.size() / 2),
                        leftSlice = sliceItems.slice(sliceSize);

                    //设置右边帧的位置关系和宽度、高度、top...
                    var rw = me.settings.posterWidth,
                        rh = me.settings.posterHeight,
                        //((容器宽-帧宽)/2)/层级 190
                        gap = ((me.settings.width - me.settings.posterWidth) / 2) / level;

                    var firstLeft = (me.settings.width - me.settings.posterWidth) / 2;
                    var fixOffsetLeft = firstLeft + rw;

                    //设置右边的位置关系
                    rightSlice.each(function(i) {
                        level--;
                        rw = rw * me.settings.scale;
                        rh = rh * me.settings.scale;
                        var j = i;
                        $(this).css({
                            zIndex: level,
                            width: rw,
                            height: rh,
                            opacity: 1 / (++j),
                            left: fixOffsetLeft + (++i) * gap - rw,
                            top: me.setVertucalAlign(rh)
                        });

                    });

                    //设置左边的位置关系
                    var lw = rightSlice.last().width(),
                        lh = rightSlice.last().height(),
                        oloop = Math.floor(me.posterItems.size() / 2);

                    leftSlice.each(function(i) {
                        $(this).css({
                            zIndex: i,
                            width: lw,
                            height: lh,
                            opacity: 1 / oloop,
                            left: i * gap,
                            top: me.setVertucalAlign(lh)
                        });

                        lw = lw / me.settings.scale;
                        lh = lh / me.settings.scale;
                        oloop--;
                    });
                },

                //设置垂直排列对齐
                setVertucalAlign: function(height) {
                    var me = this;
                    var verticalType = me.settings.verticalAlign,
                        top = 0;

                    if (verticalType === "middle") {
                        top = (me.settings.height - height) / 2;
                    } else if (verticalType === "top") {
                        top = 0;
                    } else if (verticalType === "bottom") {
                        top = me.settings.height - height;
                    } else {
                        top = (me.settings.height - height) / 2;
                    };

                    return top;
                },

                //配置左右按钮和第一帧位置
                setSettingValue: function() {
                    var me = this;
                    me.poster.css({
                        width: me.settings.width,
                        height: me.settings.height
                    });

                    me.posterItemMain.css({
                        width: me.settings.width,
                        height: me.settings.height
                    });

                    //计算左右切换按钮的宽度
                    var w = (me.settings.width - me.settings.posterWidth) / 2;

                    me.nextBtn.css({
                        width: w,
                        height: me.settings.height,
                        zIndex: Math.ceil(me.posterItems.size() / 2)
                    });
                    me.prevBtn.css({
                        width: w,
                        height: me.settings.height,
                        zIndex: Math.ceil(me.posterItems.size() / 2)
                    });
                    me.posterFirstItem.css({
                        width: me.settings.posterWidth,
                        height: me.settings.posterHeight,
                        top: me.setVertucalAlign(me.settings.posterHeight),
                        left: w,
                        zIndex: Math.floor(me.posterItems.size() / 2)
                    });
                }
            };
            return PicCarousel;
        })();

        //单例模式,添加PicCarousel方法
        $.fn.PicCarousel = function(options) {
            return this.each(function() {
                var me = $(this),
                    instance = me.data("PicCarousel");
                if (!instance) {
                    instance = new PicCarousel(me, options);
                    me.data("PicCarousel", instance);
                }
            });
        };

    }(jQuery));

    ;
    (function() {
        $(function() {
            $(".B_Demo").PicCarousel({
                "width": 1050, //幻灯片的宽度
                "height": 454, //幻灯片的高度
                "posterWidth": 750, //幻灯片第一帧的宽度
                "posterHeight": 454, //幻灯片第一张的高度
                "scale": 0.9, //记录显示比例关系
                "speed": 600, //记录幻灯片滚动速度
                "autoPlay": true, //是否开启自动播放
                "delay": 3000, //自动播放间隔
                "verticalAlign": "top" //图片对齐位置
            });

            $('.iphone').hover(function(e) {
                $(this).addClass('rotate');
            }, function() {
                $('.iphone').removeClass('rotate');
            });

            $('.theme_main01 ul').hover(function(e) {
                $(this).addClass('current01');
                $(this).siblings('span').hide();
            }, function() {
                $('.theme_main01 ul').removeClass('current01');
                $('.theme_arrow').show();
            });

            $('.theme_main01 ul li').hover(function(e) {
                $(this).css({ zIndex: 20 }).stop().fadeTo(300, 1).siblings().css({ zIndex: 2 }).stop().fadeTo(300, 0.9);
            }, function() {
                $('.theme_main01 ul li').stop().fadeTo(0, 1);
                $('.theme_main01 ul li').eq(0).css({ zIndex: 4 });
                $('.theme_main01 ul li').eq(1).css({ zIndex: 3 });
                $('.theme_main01 ul li').eq(2).css({ zIndex: 2 });
                $('.theme_main01 ul li').eq(3).css({ zIndex: 1 });

                $('.theme_main01 .th02 li').eq(0).css({ zIndex: 4 });
                $('.theme_main01 .th02 li').eq(1).css({ zIndex: 3 });
                $('.theme_main01 .th02 li').eq(2).css({ zIndex: 10 });
                $('.theme_main01 .th02 li').eq(3).css({ zIndex: 1 });
                $('.theme_main01 .th02 li').eq(3).css({ zIndex: 1 });
            });





        });

    })();;
    (function() {
        $(function() {

            $('.contact_main li').hover(function(e) {
                var index = $(this).index();
                $(this).addClass('current03').siblings().removeClass('current03');
            }, function() {
                $('.contact_main li').removeClass('current03');
            });

        });

    })();

    ;
    (function() {
        $(function() {
            var timer = null;
            var num = 0;

            function goto() {
                clearInterval(timer);
                timer = setInterval(function() {
                    num++
                    var i = num * 274;
                    if (num > 3) { num = -1 }
                    $('.all_icons').stop().animate({ left: -i }, 800);
                }, 2000);
            }
            goto();


            $('.all_icons li').hover(function(e) {
                clearInterval(timer);
            }, function() {
                goto();
            });

            $('.con_left').click(function(e) {
                clearInterval(timer);
                num--
                var i = num * 274;
                if (num < 1) { num = 3 }
                $('.all_icons').stop().animate({ left: -i }, 800);
                goto();
            });

            $('.con_right').click(function(e) {
                clearInterval(timer);
                num++
                var i = num * 274;
                if (num > 3) { num = -1 }
                $('.all_icons').stop().animate({ left: -i }, 800);
                goto();
            });

            $(window).scroll(function(e) {
                var wintop = $(window).scrollTop();

                if (wintop > 800 && wintop < 2100) {
                    $('.ul_in').removeClass('currents');
                } else {
                    $('.ul_in').addClass('currents')
                }

            });

            $('.web_main li').hover(function(e) {
                $(this).stop().fadeTo(100, 1).siblings().stop().fadeTo(300, 0.3);
            }, function() {
                $('.web_main li').stop().fadeTo(300, 1);
            });


        });

    })();;
    (function() {
        $(function() {
            $('.theme_table li').click(function(e) {
                var index = $(this).index();
                $(this).addClass('curen').siblings().removeClass('curen');
                $('.theme_main01 ul').eq(index).show().siblings().hide();
            });
            $(window).scroll(function(e) {
                var wintop = $(window).scrollTop();
                if (wintop > 560 && wintop < 1100) {
                    $('.nav_txt li').eq(0).addClass('nav').siblings().removeClass('nav');
                } else if (wintop > 1100 && wintop < 1600) {
                    $('.nav_txt li').eq(1).addClass('nav').siblings().removeClass('nav');
                } else if (wintop > 1600 && wintop < 2500) {
                    $('.nav_txt li').eq(2).addClass('nav').siblings().removeClass('nav');
                } else if (wintop > 2500 && wintop < 3200) {
                    $('.nav_txt li').eq(3).addClass('nav').siblings().removeClass('nav');
                } else if (wintop > 3200 && wintop < 4000) {
                    $('.nav_txt li').eq(4).addClass('nav').siblings().removeClass('nav');
                } else if (wintop > 4000 && wintop < 4200) {
                    $('.nav_txt li').eq(5).addClass('nav').siblings().removeClass('nav');
                } else if (wintop > 4200 && wintop < 5500) {
                    $('.nav_txt li').eq(6).addClass('nav').siblings().removeClass('nav');
                } else {
                    $('.nav_txt li').removeClass('nav');
                }
            });


        });
    })();








    ;
    (function() {
        var shijian = 500;
        var jiangeshijian = 1000; //自动轮播的时间
        var nowimg = 2;
        var lock = false;
        var mytimer = 0;

        var s0 = { "width": 248, "height": 131, "top": 100, "left": -62, "opacity": 0 }
        var s1 = { "width": 493, "height": 224, "top": 44, "left": 53, "opacity": 1 }
        var s2 = { "width": 639, "height": 270, "top": 21, "left": 186, "opacity": 1 }
        var s3 = { "width": 493, "height": 224, "top": 44, "left": 459, "opacity": 1 }
        var s4 = { "width": 248, "height": 131, "top": 100, "left": 793, "opacity": 0 }

        zidong();

        function zidong() {
            window.clearInterval(mytimer);
            mytimer = window.setInterval(
                function() {
                    $(".rightbut").trigger("click");
                }, jiangeshijian);
        }

        $("#youku").mouseenter(
            function() {
                window.clearInterval(mytimer);
            }
        );

        $("#youku").mouseleave(zidong);

        $(".rightbut").click(
            function() {
                if (!$("#images ul li").is(":animated") || lock) {
                    //折腾信号量
                    if (nowimg < $("#images ul li").length - 1) {
                        nowimg = nowimg + 1;
                    } else {
                        nowimg = 0;
                    }
                    //设置小圆点：
                    $("#xiaoyuandian ul li").eq(nowimg).addClass("cur").siblings().removeClass("cur");

                    //先交换位置、状态
                    $(".no1").animate(s0, shijian);
                    $(".no2").animate(s1, shijian);
                    $(".no3").animate(s2, shijian);
                    $(".no4").animate(s3, shijian);
                    $(".no0").css(s4);

                    //控制遮罩：
                    $(".no3 .zhezhao").animate({
                        "opacity": 0
                    }, shijian);
                    //控制遮罩：
                    $(".no2 .zhezhao").animate({
                        "opacity": 0.6
                    }, shijian);

                    //交换身份
                    $(".no0").attr("class", "denghou");
                    $(".no1").attr("class", "no0");
                    $(".no2").attr("class", "no1");
                    $(".no3").attr("class", "no2");
                    $(".no4").attr("class", "no3");

                    //交换身份要有一个经典算法：
                    if ($(".no3").next().length != 0) {
                        $(".no3").next().attr("class", "no4");
                    } else {
                        $("#images ul li:first").attr("class", "no4");
                    }
                    //下面这句话是为了保险起见
                    $(".no4").css(s4);
                }
            }
        );

        $(".leftbut").click(
            function() {
                if (!$("#images ul li").is(":animated") || lock) {
                    //折腾信号量
                    if (nowimg > 0) {
                        nowimg = nowimg - 1;
                    } else {
                        nowimg = $("#images ul li").length - 1;
                    }
                    //设置小圆点：
                    $("#xiaoyuandian ul li").eq(nowimg).addClass("cur").siblings().removeClass("cur");

                    $(".no0").animate(s1, shijian);
                    $(".no1").animate(s2, shijian);
                    $(".no2").animate(s3, shijian);
                    $(".no3").animate(s4, shijian);
                    $(".no4").css(s0);

                    //控制遮罩：
                    $(".no1 .zhezhao").animate({
                        "opacity": 0
                    }, shijian);
                    //控制遮罩：
                    $(".no2 .zhezhao").animate({
                        "opacity": 0.6
                    }, shijian);

                    $(".no4").attr("class", "denghou");
                    $(".no3").attr("class", "no4");
                    $(".no2").attr("class", "no3");
                    $(".no1").attr("class", "no2");
                    $(".no0").attr("class", "no1");
                    if ($(".no1").prev().length != 0) {
                        $(".no1").prev().attr("class", "no0");
                    } else {
                        $("#images li:last").attr("class", "no0");
                    }
                    $(".no0").css(s0);
                }
            }
        );

        $("#xiaoyuandian ul li").click(
            function() {
                //这是上帝的后门：
                lock = true;
                //先让小圆点的时间变为100毫秒
                shijian = 100;

                //判断应该模拟点击左按钮还是右按钮
                if ($(this).index() > nowimg) {
                    var cishu = $(this).index() - nowimg;
                    for (var i = 1; i <= cishu; i = i + 1) {
                        $(".rightbut").trigger("click");
                    }
                } else {
                    var cishu = nowimg - $(this).index();
                    for (var i = 1; i <= cishu; i = i + 1) {
                        $(".leftbut").trigger("click");
                    }
                }

                //再把后门关上：
                lock = false;
                shijian = 500;
                nowimg = $(this).index();
                //设置小圆点：
                $("#xiaoyuandian ul li").eq(nowimg).addClass("cur").siblings().removeClass("cur");
            }
        );
    })();
    (function() {
        $(".box li").mouseenter(function() {
            $(this).children("p").animate({
                "height": "40px",
            }, 500);
            $(this).children("div:even").animate({
                "width": "100%",
            }, 500).css("background", "#02b3bf");
            $(this).children("div:odd").animate({
                "height": "100%",
            }, 500).css("background", "#02b3bf");
        });

        $(".box li").mouseleave(function() {
            $(this).children("p").animate({
                "height": "0px"
            });
            $(this).children("div:even").animate({
                "width": "0%",
            }, 500).css("background", "#02b3bf");
            $(this).children("div:odd").animate({
                "height": "0%",
            }, 500).css("background", "#02b3bf");

        });
    })();




    ;
    (function() {
        $('.service_btm li p').hover(function(e) {
            $(this).addClass('current').parent().siblings().children('p').removeClass('current');
        }, function() {
            $('.service_btm li p').removeClass('current');
        });

    })();








    ;
    (function() {
        $('.scr7_in01').hover(function() {
            $('.scr7_in01 .span01').stop().animate({ opacity: 1 }, 300)
            $('.scr7_in01 .span03').stop().animate({ marginLeft: -380 + 'px', opacity: 1 }, 500)
            $('.scr7_in01 .span02').stop().animate({ marginLeft: -200 + 'px', opacity: 1 }, 300)
            $('.scr7_in01 .span05').stop().animate({ marginLeft: -200 + 'px', opacity: 1 }, 300)
            $('.scr7_in01 .span06').stop().animate({ marginLeft: -200 + 'px', opacity: 1 }, 300)
            $('.scr7_in01 .span04').stop().animate({ marginLeft: 60 + 'px', opacity: 1 }, 300)
            $('.scr7_in01 .span07').stop().animate({ marginRight: -330 + 'px', opacity: 1 }, 300)
            $('.scr7_in01 .span08').stop().animate({ marginRight: -308 + 'px', opacity: 1 }, 300)
            $('.scr7_in01 .span09').stop().animate({ marginRight: -468 + 'px', opacity: 1 }, 300)
            $('.scr7_in01 .span10').stop().animate({ marginTop: -60 + 'px', opacity: 0 }, 500)
        }, function() {
            $('.scr7_in01 .span01').stop().animate({ opacity: 0 }, 300)
            $('.scr7_in01 .span03').stop().animate({ marginLeft: -360 + 'px', opacity: 0 }, 500)
            $('.scr7_in01 .span02').stop().animate({ marginLeft: -180 + 'px', opacity: 0 }, 300)
            $('.scr7_in01 .span05').stop().animate({ marginLeft: -180 + 'px', opacity: 0 }, 300)
            $('.scr7_in01 .span06').stop().animate({ marginLeft: -180 + 'px', opacity: 0 }, 300)
            $('.scr7_in01 .span04').stop().animate({ marginLeft: 40 + 'px', opacity: 0 }, 300)
            $('.scr7_in01 .span07').stop().animate({ marginRight: 310 + 'px', opacity: 0 }, 300)
            $('.scr7_in01 .span08').stop().animate({ marginRight: 310 + 'px', opacity: 0 }, 300)
            $('.scr7_in01 .span09').stop().animate({ marginRight: 380 + 'px', opacity: 0 }, 300)
            $('.scr7_in01 .span10').stop().animate({ marginTop: -40 + 'px', opacity: 1 }, 500)
        });

    })();


































})