dataCollection = {}
templateStatCard = $.ajax({url : 'templates/stat_card.html', async: false}).responseText;
//Mustache.parse(templateStatCard);
eotCard = new cardEventsOverTime();

$(document).ready(function() {
  $.ajax({
    url: "http://telemetry.minzkraut.com/api/get/events/all",
    dataType: 'json',
    async: false,
    //data: myData,
    success: function(data) {
      var items = [];
      $.each( data, function( key, val ) {
        dataCollection[key] = val;
      });
      initCards();
    }
  });
  $.ajax({
    url: "http://telemetry.minzkraut.com/api/get/types",
    dataType: 'json',
    async: false,
    //data: myData,
    success: function(data) {
      dataCollection['types'] = data;
    }
  });
  $('.card').each(function(index) {
    $(this).delay(80*(index*2)).queue(function() { 
      $(this).addClass('').dequeue(); });
  });
});

//redraw graph when window resize is completed  
$(window).on('resizeEnd', function() {
    drawEotChart(eotCard, eotCard.data);
});
  
function cardEventsOverTime() { 
  this.cardId = "eot";
  this.statContext = "Events";
  this.chartTitle =  "Events over time";
  this.data = null;
  this.add = function () {
    addCard(this);
  }
}

function initCards() {
  console.log("Init cards");
  eotCard.add()
  eotCard.data = prepSumData();
  google.charts.setOnLoadCallback(function() {drawEotChart(eotCard, eotCard.data)});

  
}

function addCard(card) {
  var rendered = Mustache.render(templateStatCard, {'card-id' : card.cardId});
  $('#target').append(rendered);
} 

function prepSumData(){
  var dataRows = [];
  previous =  null;
  var eventCount = 0;
  var totalEvents = $(dataCollection['events']).length;
  var timeStamp;
  $.each(dataCollection['events'], function( key, val ) {
    timeStamp = new Date(val['timestamp']);
    dataRows.push([timeStamp, 1]);
  });
  //dataRows.push([timeStamp, eventCount]);
  console.log(dataRows);
  return dataRows;
}
function floorDate(datetime) {
   var newDate = new Date(datetime);
   newDate.setHours(0);
   newDate.setMinutes(0);
   newDate.setSeconds(0);
   return newDate;
 }
function drawEotChart(_LineChartCard, _data) {
      targetDiv = "chart-"+_LineChartCard.cardId+"-div"; chartTitle = _LineChartCard.chartTitle;
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'Y');
      data.addColumn('number', 'Events');
      data.addRows(_data);

      var options = {
        title: chartTitle,
        animation: { startup : true, duration: 800, easing: 'inAndOut' },
        legend: {position : 'none'},
        
        hAxis: {
          title: 'Date',
        },
        vAxis: {
          title: 'Events',
          logScale: false
        },
        colors: ['#004d40', '#ff5722']
      };
     var newData = google.visualization.data.group(data, [{
          column: 0,
          modifier: floorDate,
          type: 'date'
      }], [{
          column: 1,
          label: 'Events',
          aggregation: google.visualization.data.sum,
          type: 'number'
      }]);

      eotChart = new google.visualization.LineChart(document.getElementById(targetDiv));
      eotChart.draw(newData, options);
}