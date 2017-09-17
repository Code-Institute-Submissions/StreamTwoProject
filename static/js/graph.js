var windowWidth = ($(window).width());
window.onresize = function() {
	if (windowWidth !== ($(window).width())) {
    	location.reload();
    }
}

queue()
   .defer(d3.json, "/airportLA/airport")
   .await(makeGraphs);

function makeGraphs(error, projectsJson) {

    var timechartWidth = $("#time-chart").width();
    var timechartHeight = timechartWidth / 4;
    var terminalchartWidth = $("#Terminal-bar-chart").width();
    var terminalchartHeight = terminalchartWidth / 4;
    var DompieChartradius = $("#DomInterChart-pie-chart").width() / 2.5;
    var DompieChartIradius =  DompieChartradius / 10;
    var DompieChartWidth = $("#DomInterChart-pie-chart").width();
    var DompieChartHeight = DompieChartWidth;
    var ArrpieChartradius = $("#ArriveDepart-pie-chart").width() / 2.5;
    var ArrpieChartIradius =  ArrpieChartradius / 10;
    var ArrpieChartWidth = $("#ArriveDepart-pie-chart").width();
    var ArrpieChartHeight = ArrpieChartWidth;

   var airportLA = projectsJson;
   var dateFormat = d3.time.format("%m/%d/%Y %H:%M:%S %p");
   airportLA.forEach(function (d) {
       d["ReportPeriod"] = dateFormat.parse(d["ReportPeriod"]);
       d["ReportPeriod"].setDate(1);
    });

    var ndx = crossfilter(airportLA);

   var dateDim = ndx.dimension(function (d) {
       return d["ReportPeriod"];
   });

   var Dom_InternationalDim = ndx.dimension(function (d) {
       return d["Domestic_International"];
    });

   var Arrive_DepartDim = ndx.dimension(function (d) {
       return d["Arrival_Departure"];
   });

   var TerminalDim = ndx.dimension(function (d) {
       return d["Terminal"];
   });

    var numPassengerByDate = dateDim.group().reduceSum(function (d) {
       return d["Passenger_Count"];
    });
    var numDomestic_International = Dom_InternationalDim.group();
    var numArriveVsDepart = Arrive_DepartDim.group();
    var numTerminal = TerminalDim.group().reduceCount(function(d) {
        return d["Terminal"];
    });
    var totalPassenger = ndx.groupAll().reduceSum(function (d) {
        return d["Passenger_Count"];
    });

   var minDate = dateDim.bottom(1)[0]["ReportPeriod"];
   var maxDate = dateDim.top(1)[0]["ReportPeriod"];


   var PassengerVolumeChart = dc.lineChart("#time-chart");
   var DomInterChart = dc.pieChart("#DomInterChart-pie-chart");
   var ArriveDepartChart = dc.pieChart("#ArriveDepart-pie-chart");
   var TerminalChart = dc.rowChart("#Terminal-bar-chart");
   var PassengerCount = dc.numberDisplay("#PassengerCount-number-display");

    PassengerVolumeChart
       .width(timechartWidth)
       .height(timechartHeight)
       .margins({top: 10, right: 50, bottom: 30, left: 60})
       .dimension(dateDim)
       .group(numPassengerByDate)
       .transitionDuration(500)
       .x(d3.time.scale().domain([minDate, maxDate]))
       .elasticY(true)
       .xAxisLabel("Year")
       .renderHorizontalGridLines(true)
       .renderVerticalGridLines(true)
       .yAxis().ticks(5);

    DomInterChart
       .height(DompieChartHeight)
       .width(DompieChartWidth)
       .radius(DompieChartradius)
       .innerRadius(DompieChartIradius)
       .transitionDuration(1500)
       .dimension(Dom_InternationalDim)
       .group(numDomestic_International);

    ArriveDepartChart
        .height(ArrpieChartHeight)
        .width(ArrpieChartWidth)
        .radius(ArrpieChartradius)
        .innerRadius(ArrpieChartIradius)
        .transitionDuration(1500)
        .dimension(Arrive_DepartDim)
        .group(numArriveVsDepart);

    TerminalChart
        .width(terminalchartWidth)
        .height(terminalchartHeight)
        .dimension(TerminalDim)
        .group(numTerminal)
        .xAxis().ticks(5);

    PassengerCount
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalPassenger)
       .formatNumber(d3.format(".3s"));

   dc.renderAll();
}