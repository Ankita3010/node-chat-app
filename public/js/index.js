var socket = io();

socket.on('connect' , function() {
  socket.on('show', function(roomList) {

    var input = jQuery('<input>').attr({'list': "roomlist", 'name': "room", "autocomplete" :"off"});
    var datalist = jQuery('<datalist></datalist>').attr({'id':'roomlist'});
    // var datalist = jQuery('#roomList').
    roomList.forEach(function (room) {
      datalist.append(jQuery('<option>').attr({'value':room, 'class': 'form-field'}));
    });
    input.append(datalist);
    jQuery('#rooms').html(input);
    console.log(datalist);
  });
});
