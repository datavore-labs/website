function sizePanels() {
  // create variables
  var $fwindow = $(window);
  // on window scroll event
  $fwindow.on('resize', function() {
    $('[data-type="dynamicBgHeight"]').each(function(){
      var $section = $(this);
      var height = $section.outerHeight() || $section.height();
      $section.find('[data-type="background"]').css('height', height+"px");
    }); 
  });  
}

// makes the parallax elements
function parallaxIt() {

  // create variables
  var $fwindow = $(window);
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // on window scroll event
  $fwindow.on('scroll resize', function() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  }); 

  // for each of content parallax element
  // $('[data-type="content"]').each(function (index, e) {
  //   var $contentObj = $(this);
  //   var fgOffset = parseInt($contentObj.offset().top);
  //   var yPos;
  //   var speed = ($contentObj.data('speed') || 1 );

  //   $fwindow.on('scroll resize', function (){
  //     yPos = fgOffset - scrollTop / speed; 

  //     $contentObj.css('top', yPos);
  //   });
  // });

  // for each of background parallax element
  $('[data-type="background"]').each(function(){
    var $backgroundObj = $(this);
    var bgOffset = parseInt($backgroundObj.offset().top);
    var yPos;
    var coords;
    var speed = ($backgroundObj.data('speed') || 0 );

    $fwindow.on('scroll resize', function() {
      yPos = - ((scrollTop - bgOffset) / speed); 
      coords = '40% '+ yPos + 'px';

      $backgroundObj.css({ backgroundPosition: coords });
    }); 
  }); 

  // triggers winodw scroll for refresh
  $fwindow.trigger('scroll');
};

function submitDemoRequest() {
  var url = 'https://script.google.com/macros/s/AKfycbxuHrfHLCPgk3veeS5ABO5d8MC8I6CzQylb4GczUre-qzbEP_E/exec'


  $('#demorequest').on('shown.bs.modal', function () {
      //TODO: Set focus here  
  });

  $('#sendDemoRequest').on('click', function(e) {
    e.preventDefault();
    var name = $('#requestDemoForm').find('input[name="name"]').val();
    var email = $('#requestDemoForm').find('input[name="email"]').val();
    var jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: {'Name': name, 'Email': email, 'Time': new Date()}
    })

    jqxhr.done(function(){
      $('#demorequest').modal('hide')
    });

  })
  
}

sizePanels();

parallaxIt();

submitDemoRequest();