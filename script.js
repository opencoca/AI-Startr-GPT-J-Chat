//var gun = Gun().get('thoughts');
var gun = 
Gun('https://gunjs.herokuapp.com/gun').get('tutorial/chat/app');
//var gun = 
//Gun('http://oyo.openco.ca:8080/gun').get('tutorial/chat/app');

       $('form').on('submit', function(event) {
            event.preventDefault();
            var message = {};
            message.who = $('form').find('input.who').val();
            message.what = $('form').find('input.what').val();
            message.when = new Date().getTime();
            gun.set(message);
            $('form').find('input.what').val("");
        });
//gun.map().on(function(thought, id) {
gun.map().val(function(message, id){
if(!message.what || !message.who){ return; }
  else {
					var $li = $(
						$('#' + id).get(0) || 
						$('.model').find('.message').clone(true).attr('id', id).appendTo('ul')
					);
					$li.find('.who').text(message.who);
					$li.find('.what').text(message.what);
					$li.find('.when').text(moment(message.when).format("ddd HH:mmA  "));
    $("html, body").scrollTop($(document).height());
}});


// clear nodes from gundb based on coresponding id when double clicked
$('body').on('dblclick', 'li', function(event) {
    gun.get(this.id).put(null);
});