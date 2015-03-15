$(document).ready(function() {
  // $('.background-image').on('webkitAnimationEnd', function(e) {
  //   $(this).addClass('visible');
  // });

  // $('.background-image').on('webkitAnimationEnd', function(e) {
  //   $(this).addClass('visible');
  // });

  $('.background-image').bind('oanimationend animationend webkitAnimationEnd', function() {
    $(this).addClass('visible');
  });
});
