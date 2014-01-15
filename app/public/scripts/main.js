$(document).on('ready', function() {

  $('.js-cmd').on('click', function (evt) {
    evt.preventDefault();
    var that = this;

    $.get($(this).attr('href'), {}, function (res) {
      console.log($(that).attr('href'), res);
      if (res) {
        if (res.action) {
            $('#action').text(res.action);
        } else {
            $('#action').text('not set');
        }
        if (res.value) {
            $('#value').text(res.value);
        } else {
            $('#value').text('not set');
        }
      }
    });
  });

});
