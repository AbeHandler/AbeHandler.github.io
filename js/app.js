(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
window.onload = function() {
    $('.square').hide();
    $('#council').find('.square').show();
    $(window).resize(function() {
        loadmap('council'); //to do BUG
        sizebuttons();
    });
    $(".label").on("click", function() {
        loadmap(this.id);
    });

    $('.label').click(function() {
        $('.square').hide();
        $(this).find('.square').show();
        //$('.square').show();
    });

    $('li').click(function() {
        $('li.selected').removeClass('selected');
        $(this).addClass('selected');
    });

    $('div.button').click(function() {
        $('.square').hide();
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        var id = '#' + this.id.split("-")[0];
        $(id).addClass('selected');
        $(id).find('.square').show();
        loadmap(id.replace("#", ""));
    });

    $('li').click(function() {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        var id = "#" + $(":first-child", $(this))[0].id + "-button";
        $(id).addClass("selected");
    });

    /*$("#map").slimScroll({
        height: '250px'
    });*/
    readtotals();
    readprecincts();
    loadmap('council');
    /* $('.button').tipsy({
        gravity: 'w',
        title: function() {
            return 'Hi there!';
        }
    });
    $('g').tipsy({
        gravity: 'w',
        html: true,
        title: function() {
            return 'Hi there!';
        }
    });
    $('.O').tipsy({
        gravity: 'w',
        html: true,
        title: function() {
            return 'Hi there!';
        }
    });
    $('.T').tipsy({
        gravity: 'w',
        html: true,
        title: function() {
            return 'Hi there!';
        }
    });
    $('.button').simpletip({
        // Configuration properties
        content: 'My Simpletip',
        fixed: false
    });
    $('.precinct').simpletip({
        // Configuration properties
        content: 'My Simpletip',
        fixed: false
    });

    /*$('.precinct').tipsy({
        gravity: 'w',
        title: function() {
            alert('here');
            return 'Hi there!';
        }
    });*/
    sizebuttons();
    getLastUpdate();
    $(".precinct").mouseover(function() {
        alert("mouseover!");
    });
};

$(document).ready(function() {
    $(document).ready(function() {
        setInterval(function() {
            var selected = $('.selected')[0].id.split("-")[0];
            loadmap(selected);
            getLastUpdate();
        }, 120000);
    });
});
;function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function sizebuttons() {
    var width = $(window).width();
    if ((width) < 650) {
        $('.button_title').css("font-size", ".01em");
        $('.button_title').css("font-weight", "normal");
        $('.button').css("margin-left", "0px");
        $('.button').css("margin-right", "0px");
        $('.button').css("font-size", ".75em");
        $('.button').css("width", "15%");
        $('#buttons').css("height", "25%");
    } else {
        $('.button_title').css("font-size", "1em");
        $('.button_title').css("font-weight", "normal");
        $('.button').css("margin-left", "1.5%");
        $('.button').css("margin-right", "1.5%");
        $('.button').css("font-size", ".75em");
        $('.button').css("width", "13%");
        $('#buttons').css("height", "10%");
    }
}

function sizeResultsBox() {

    var width = $(window).width(),
        height = $(window).height();
}


function getLastUpdate() {
    var now = new Date();
    //now = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    $("#lastupdate").html("Last update: " +
        now.toLocaleTimeString() + "<br> Page automatically refreshes every 2 minutes");
}

function formatTimeOfDay(millisSinceEpoch) {
    var secondsSinceEpoch = (millisSinceEpoch / 1000) | 0;
    var secondsInDay = ((secondsSinceEpoch % 86400) + 86400) % 86400;
    var seconds = secondsInDay % 60;
    var minutes = ((secondsInDay / 60) | 0) % 60;
    var hours = (secondsInDay / 3600) | 0;
    return hours + (minutes < 10 ? ":0" : ":") + minutes + (seconds < 10 ? ":0" : ":") + seconds;
}

function reloadselected() {
    try {
        var selected = $('.selected')[0].id.split("-")[0];
        loadmap(selected);
        var now = new Date();
        now = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
        $("#lastupdate").html(now);
    } catch (err) {}
}

function countprecincts() {
    var t = $(".T").length;
    var o = $(".O").length;
    return (t + o);
}

function countvotes(candidate) {
    var t = 0;
    $("." + candidate).each(function(i, val) {
        t += parseInt($(this).attr("title").split("-")[0]);
    });
    return (t);
}


function readprecincts() {

    var totals = {};

    queue()
        .defer(d3.csv, "data/precincts.csv", function(d) {
            totals[d.district] = d.total;
        }).await(ready);

    function ready(error, us) {
        var total_c = totals['47479'];
        var total_city = totals['47474'];
        $('#pctreporting-citywide').html(total_c + ' of 65 precincts reporting');
        $('.pctreporting').html(total_city + ' of 366 precincts reporting');
    }
}

function readtotals() {

    var totals = {};

    queue()
        .defer(d3.csv, "data/master.csv", function(d) {
            totals[d.id] = d.votes;
        }).await(ready);

    function ready(error, us) {
        for (var prop in totals) {
            var votes = totals[prop];
            var selector = "#" + prop;
            $(selector).html(addCommas(votes));
        }
    }
}

function loadmap(file) {

    $("#map").html('');


    //Width and height
    var width = $("#mapwrapper").width(),
        height = $("#mapwrapper").height();

    var wards = d3.map();
    var votesone = d3.map();
    var votestwo = d3.map();

    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

    var projection = d3.geo.mercator().translate([width / 2, height / 2]).scale(width * 100).center([-89.90, 29.95]);

    var path = d3.geo.path().projection(projection);

    queue()
        .defer(d3.json, "maps/w.json")
        .defer(d3.csv, "data/" + file + ".csv", function(d) {
            wards.set(d.id, d.winner);
            votesone.set(d.id, d.votesone);
            votestwo.set(d.id, d.votestwo);
        }).await(ready);

    function ready(error, us) {

        var zoom = d3.behavior.zoom()
            .translate([0, 0])
            .scale(1)
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        var features = svg.append("g");

        features.append("g")
            .attr("class", "precincts")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.orleansgeojson).features)
            .enter().append("path")
            .attr("class", (function(d) {
                return wards.get(d.id) + " precinct";
            }))
        //  .attr("title", (function(d) {
        //      return votesone.get(d.id) + "-" + votestwo.get(d.id);
        //  }))
        .attr("id", function(d) {
            return d.id;
        })
            .attr("d", path)
            .append("title").text(Math.floor(Math.random() * 11));

        features.append("g")
            .attr("class", "coastlines")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.coastlines).features)
            .enter().append("path")
            .attr("d", path);

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .call(zoom);

        function zoomed() {
            features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            features.select(".precinct").style("stroke-width", 1.5 / d3.event.scale + "px");
        }

    }

}
;
//# sourceMappingURL=app.js.map