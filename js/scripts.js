$(function() {
  var photoCollection;
  var currentUrl =  window.location.href.split('/');
  var lastItem = function(arr){
    return arr[arr.length-1];
  }

  var fadeDuration = 700;

  var AnotherComposition = [['julia_seemann4.jpg'], ['julia_seemann1.jpg', 'julia_seemann2.jpg'], ['julia_seemann5.jpg', 'julia_seemann6.jpg'], ['julia_seemann14.jpg'], ['julia_seemann10.jpg', 'julia_seemann11.jpg'], ['julia_seemann9.jpg'] , ['julia_seemann7.jpg', 'julia_seemann8.jpg'],['julia_seemann12.jpg', 'julia_seemann13.jpg'] ,[{text: {credit: 'http://www.laurettasuter.ch/697037', photography: 'Photography: Lauretta Suter', model: 'Model: Brogan Loftus' }}]];

  var FragileBeauty = [['Lookbook FRAGILE_Seite_04.jpg'] , ['Lookbook FRAGILE_Seite_02.jpg', 'Lookbook FRAGILE_Seite_03.jpg'], ['Lookbook FRAGILE_Seite_01.jpg', 'Lookbook FRAGILE_Seite_08.jpg'], ['Lookbook FRAGILE_Seite_07.jpg', 'Lookbook FRAGILE_Seite_21.jpg'], ['Lookbook FRAGILE_Seite_12.jpg', 'Lookbook FRAGILE_Seite_11.jpg'], ['Lookbook FRAGILE_Seite_15.jpg', 'Lookbook FRAGILE_Seite_22.jpg'], ['Lookbook FRAGILE_Seite_19.jpg', 'Lookbook FRAGILE_Seite_16.jpg'],['Lookbook FRAGILE_Seite_18.jpg', 'Lookbook FRAGILE_Seite_20.jpg'],  [{text: {credit: 'http://www.d-o-m.ch/index.php?page=1' ,photography: 'Photography: Dominik Jermann', model: 'Models: Tamara Petrovic & Sophia Seemann' }}]];

  if(lastItem(currentUrl) === "another_composition.html"){
    photoCollection = AnotherComposition;
  }else if (lastItem(currentUrl) === "fragile_beauty.html"){
    photoCollection = FragileBeauty;
  }

 var $galleryDiv = $('div.gallery')
  // render first photo
  if($galleryDiv.length > 0){
    $galleryDiv.css({opacity: 0.0});
    $galleryDiv.html(singleTemplate(photoCollection[0])).promise().done(function(){
      $galleryDiv.animate({opacity: 1.0}, 1000);
    });;
  }


  var $textOnly = $('div.textOnly');
  // If text on page, fade in text
  if($textOnly.length > 0){
    $textOnly.css({opacity: 0.0});
    $textOnly.animate({opacity: 1.0}, 1000);
  }

   // setTimeout(function() {
  //   $(selector).fadeIn("slow");
  // }, 1000);

  // Renders based on this information
  var i = 1;
  $('div.gallery').click(function() {

    if(i === photoCollection.length){
      i = 0;
    }
    renderTemplate( photoCollection[i], 'div.gallery', fadeDuration );
    i++
  });

  $('h2.menuItem').click(function() {
    $('h2.menuItem').removeClass("current");
    $(this).addClass("current");
    console.log("this", $(this));
  });

  function renderTemplate(item, selector, duration){
    console.log("THE ITEM.text", item);
    var currentTemplate;

    if(item[0].text){
      console.log(textTemplate(item[0].text));
      currentTemplate = textTemplate(item[0].text);
      //$(selector).html(textTemplate(item.text))
      //textTemplate(item.text);
    } else if (item.length === 2){
      console.log(dualTemplate(item[0], item[1]));
      currentTemplate = dualTemplate(item[0], item[1]);
    } else{
      console.log(singleTemplate(item));
      currentTemplate = singleTemplate(item);
      //singleTemplate(item);
    }
    //$(selector).html(currentTemplate);
    $(selector).animate({opacity: 0.0}, duration).promise().done(function(){
      $(selector).html(currentTemplate).promise().done(function(){
        $('div.gallery').animate({opacity: 1.0}, duration);
      });
    });
  }

  // PUT THIS STUFF IN A SIAF

  function singleTemplate(imageName){
    return "<img class='main' src='images/" + imageName + "'>";
  };

  function dualTemplate(imageOne, imageTwo){
    return "<div class='ag4'><img class='main' src='images/" + imageOne + "'></div><div class='ag4'><img class='main' src='images/" + imageTwo + "'></div>";
  }

  function textTemplate(text){
    return "<div class='textOnly'><div class='credits'><a target='_blank' href=" + text.credit + "><p>" + text.photography + "</p></a><br><p>" + text.model + "</p></div></div>"
  }

});


