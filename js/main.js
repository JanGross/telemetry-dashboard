$(document).ready(function (){
  
  $(".button-collapse").sideNav();
  $('#refresh-menu-btn').click(function (){
    location.reload();
  });
  $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '14%', // Starting top style attribute
      endingTop: '110%', // Ending top style attribute
  }
  );
  
  
  
  //google.charts.setOnLoadCallback(drawChart1);
  //google.charts.setOnLoadCallback(drawChart2);
  $('.dropdown-button').each(function() { 
    $(this).dropdown({
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: -0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'right', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    })
  });
  
  //create trigger to resizeEnd event     
  $(window).resize(function() {
      if(this.resizeTO) clearTimeout(this.resizeTO);
      this.resizeTO = setTimeout(function() {
          $(this).trigger('resizeEnd');
      }, 500);
  });
  
  
  $("#send-event").click(function () {
    $.ajax({
      type : "POST",
      contentType: 'application/json;',
      url  : "/api/event/" + $("#type").val(),
      dataType: "json",
      data : JSON.stringify({ 
        'app'  : $("#app").val(), 
        'uid'  : $("#uid").val(), 
        'json' : $("#json").val(),
        'debug': $("#debug-response").prop("checked") ? 1 : 0
      }),
      success: function(result){
        console.log(result);
        Materialize.toast('Event Triggered: ' + format(result), 10000);
      },
      error: function(result){
        Materialize.toast('Error sending event!' + result.statusText, 4000);
        console.log(result);
      }
    });
  });
});

function format(text) {
  return text.replace(/\n/g, "<br />");
}

function drawChart2() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Application1',     3],
          ['Application2',      2],
          ['Application3',  2],
        ]);

        var options = {
          title: 'Event distribution by application',
          animation: {startup: true, duration: 500, easing: 'inAndOut'},
          pieHole: 0.25,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donut_div'));
        chart.draw(data, options);
        Materialize.fadeInImage("#donut_div");
      }