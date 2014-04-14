$('#carousel').elastislide({
    minItems: 2
});

$(document).ready(function() {
    loadThumbs();
});

$(function() {
    $("#dialog").dialog({
        autoOpen: false,
        resizable: false,
        width: "auto",
        buttons: {
            Close: function() {
                $(this).dialog("close");
            }
        }
    });
});

function showDialog(pth) {

    $("#dialog").html('<img src="pic' + pth + '"><div id="caption"></div>');
    jQuery("#dialog").prev('.ui-dialog-titlebar').css("background", "white");
    $("#dialog").dialog("option", "position", {
        my: "center",
        at: "center",
        of: "#mapholder"
    });
    $.post("caption" + pth, function(data) {
        $("#caption").html(data);
    });
    if ($("#dialog").dialog("isOpen") === false) {
        $("#dialog").dialog("open");
        $(".ui-dialog").attr('top', '50px');
    }
    $("#dialog").dialog('option', 'title', pth.replace(/_/g, " ").replace("/", ""));
    $(".ui-dialog").css({
        top: 50
    });
    $(".ui-dialog").css({
        left: 125
    });
    $(".ui-dialog").css({
        width: 500
    });
}

var show = true;

$(".thumbnail").on("click", function(e) {
    var pth = this.pathname;
    showDialog(pth);
});


$("#switch").click(function() {
    if (show) {
        $("#switch").html("Show");
        show = false;
    } else {
        show = true;
        $("#switch").html("Hide");
    }
    $("#toggle").toggle("slide");
});

$(function() {
    $("input[type=submit], a, button")
        .button()
        .click(function(event) {
            event.preventDefault();
        });
});

$(".t").mouseover(function() {
    alert("sh");
});

var map = new L.Map("map", {
    center: [29.95, -90.05],
    zoom: 13,
    minZoom: 10,
    maxZoom: 18
})
    .addLayer(new L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png'));

map.on('moveend', function() {
    loadThumbs();
});

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");


d3.json('static/out.json', function(collection) {
    var bounds = d3.geo.bounds(collection),
        path = d3.geo.path().projection(project).pointRadius(function(d) {
            return 2;
        });
    console.warn(path);

    var feature = g.selectAll("path")
        .data(collection.features)
        .enter().append("path").attr("class", function(d) {
            return d.properties.category + " " + d.properties.investigates + " " + d.properties.thumbnail;
        }).attr("id", function(d) {
            return d.geometry.address;
        }).attr("lat", function(d) {
            return Math.abs(d.geometry.coordinates[1]);
        }).attr("long", function(d) {
            return Math.abs(d.geometry.coordinates[0]);
        });
    $(".t").on("click", function(e) {
        var adr = "/" + this.id;
        showDialog(adr);
    });

    //$(".t").on("mouseover", function(e) {
    //    alert("S");
    //});

    $(function() {
        $('.t').tipsy({
            gravity: 's',
            title: function(s) {
                return this.id.replace(/_/g, " ");
            }
        });
        $('.f').tipsy({
            gravity: 's',
            title: function() {
                return this.id.replace(/_/g, " ");
            }
        });
    });

    map.on("viewreset", reset);
    reset();

    // Reposition the SVG to cover the features.
    function reset() {
        console.warn(bounds);
        var bottomLeft = project(bounds[0]),
            topRight = project(bounds[1]);

        svg.attr("width", topRight[0] - bottomLeft[0])
            .attr("height", bottomLeft[1] - topRight[1])
            .style("margin-left", bottomLeft[0] + "px")
            .style("margin-top", topRight[1] + "px").attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

        g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

        feature.attr("d", path);
    }

    // Use Leaflet to implement a D3 geographic projection.
    function project(x) {
        var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
        var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (is_firefox) {
            point.x = point.x - 192;
        }
        return [point.x, point.y];
    }

});

function loadThumbs() {
    var bounds = map.getBounds();
    var f = $("path.yesthumbnail").filter(function() {
        return $(this).attr("long") < Math.abs(bounds._southWest.lng) && $(this).attr("long") > Math.abs(bounds._northEast.lng) && $(this).attr("lat") < Math.abs(bounds._northEast.lat) && $(this).attr("lat") > Math.abs(bounds._southWest.lat);
    });
    var slicetot = 0;
    if (f.length < 10) {
        slicetot = f;
    } else {
        slicetot = 11;
    }

    var newpics = f.slice(0, slicetot);

    for (var i = 0; i < newpics.length; i++) {
        var inner = '<span class="ui-button-text"><img src="thumb/' + f[i].id + '"></span>';
        $("#" + i).html(inner);
        $("#" + i).attr("href", f[i].id);
    }
}