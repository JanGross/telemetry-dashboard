eventListEntry = $.ajax({url : 'templates/event_list_entry.html', async: false}).responseText;

$(document).ready(function() {
  var socket = io.connect('http://telemetry.minzkraut.com:8000');
  socket.on('connect', function() {
      console.log("Socket connected")
      Materialize.toast('Socket connected', 5000);
  });
  socket.on('disconnect', function() {
      console.log('Socket Disconnected');
      Materialize.toast('Socket connection lost', 10000);
  });
  socket.on('event', function(msg) {
      if($('#waiting-event')){
        $('#waiting-event').remove();
      }
      //Materialize.toast('Event: ' + msg.data['event_type'], 1000);
      console.log(msg.data);
      
      var jsonArray = []
      $.each(msg.data['json_data'], function(key,val){
        jsonArray.push(key + ':'  +  JSON.stringify(val));
      });
      var locationString =  msg.data['location']['country_name'] + '/' + msg.data['location']['region_code'] + ", " + msg.data['location']['city'];
      var locationUrl = 'https://www.google.com/maps?q=' + msg.data['location']['lat'] + ',' + msg.data['location']['lon'] + '&ll=' + msg.data['location']['lat'] + ',' + msg.data['location']['lon'] + '&z=5';
      var rendered = Mustache.render(eventListEntry, {'icon' : 'send', 
                                                      'title' : msg.data['event_type'], 
                                                      'app' : msg.data['app_name'],
                                                      'json' : jsonArray, 
                                                      'user': msg.data['user_id'],
                                                      'location_string': locationString ,
                                                      'location_url': locationUrl,
                                                      'timestamp': msg.data['timestamp']});
      var entry = $(rendered);
      $('#event-list').append(entry);
      entry.show('slow');
      var entries = $('.event-entry');
      if(entries.length > 10){
        var first = entries.first()
        first.hide('slow', function(){first.remove();});
      }
  });
});