<!-- Modal Structure -->
    <div id="modal1" class="modal modal-fixed-footer bottom-sheet">
      <div class="modal-content">
        <h4>Trigger Manual Event</h4>
        <p>Send a custom event. </p>
        <div class="input-field inline">
          <input id="type" type="text" value="debug_event">
          <label for="type">Type</label>
        </div>
        <div class="input-field inline">
          <input id="uid" type="text" value="WWW-DSHBRD">
          <label for="uid">UserID</label>
        </div>
        <div class="input-field inline">
          <input id="app" type="text" value="Dashboard">
          <label for="app">Application</label>
        </div>
        <div class="input-field">
          <textarea id="json" class="materialize-textarea">{ "key": "value" }</textarea>
            <label for="json">JSON Data</label>
        </div>
      </div>
      <div class="modal-footer">
        <input type="checkbox" class="filled-in" id="debug-response" />
        <label for="debug-response">Request debug reponse</label>
        <a id="send-event" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Send<i class="right material-icons">send</i></a>
      </div>
    </div>
    
    
    <script src="js/main.js"></script>
    