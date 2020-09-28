$(document).ready(function() {
// doings
// 1) pastga ketayotganda linklar rangi ozgarversin

//  when the page loads
  workWithLinks();

// Opening side Navigation
  $('.burger').click(function() {
    $('.topnav').animate({width: '250px'});
    $('body').css({overflow: 'hidden'});
    $('.overlay').fadeIn();
  })

// Closing side Navigation
  $('.close').click(function() {
    $('.topnav').animate({width: '0px'});
    $('body').css('overflow', 'auto');
    $('.overlay').fadeOut();
  })

// clicking anchors
  $('.topnav a[href*="#"]').on('click', function (e) {
     e.preventDefault();

     let position = $(`section.${$(this).attr('href').substring(1)}`).offset().top;
     if($('.topnav').css('display') === 'flex'){
       position -= 40;
     }

     $(this).addClass('activeLink').siblings().removeClass('activeLink');
     $('html, body').animate(
        {
          scrollTop: position
        },
        500,
        'linear',
        () => {
          document.location.hash = $(this).attr('href')
        }
      )

      if($('.topnav').css('display') !== 'flex'){
        $('.close').click()
      }
  })

  // clicking Buttons
  $('.contactusBtn').click(function() {
    $('.topnav a[href*="#contact"]').click()
  })
  $('.learnMoreBtn').click(function() {
    $('.topnav a[href*="#portfolio"]').click()
  })

  // Tabs
  $('.types a').click(function() {
    $('.types a').removeClass('active');
    $(this).addClass('active')

    if($(this).text() !== 'ALL'){
      $('.images img').hide();
      $(`.${$(this).text()}`).fadeIn(500)
    } else {
      $('.images img').hide();
      $('.images img').fadeIn(500);
    }

  })

// Scrolling
   $('.toRight').click(function() {
     $('.containerTab .types').animate({
      scrollLeft: "+=200px"
    }, "slow")
   });

   $('.toLeft').click(function() {
     $('.containerTab .types').animate({
      scrollLeft: "-=200px"
    }, "slow")
   });

//  Image scrolling
    $('.toRight2').click(function() {
      $('.members').animate({
       scrollLeft: "+=150px"
     }, "slow")
    });

    $('.toLeft2').click(function() {
      $('.members').animate({
       scrollLeft: "-=150px"
     }, "slow")
    });
// AJAX
  // sending email addres for subscribe
  $(".subscribeBtn").click(function(){
    let email = $('.subscribeEmail').val();
    ajaxRequest('verstka-1-emails', email, elemGenerator('form', this), this)
  });

  $('.sendMessageBtn').click(function() {
    let data = {
      email: $('.emailInput').val(),
      name: $('.nameInput').val(),
      text: $('.textarea').val()
    };
    ajaxRequest('verstka-1-messages', data, elemGenerator('inputs', this), this)
  });

  //  end of document.ready
})

// when page loads
function workWithLinks() {
  let hash = document.location.hash;
  console.log(hash)
  if(hash === '' || hash === '#home'){
    $('.topnav a').removeClass('activeLink')
    $('.topnav a[href="#home"]').addClass('activeLink');

  } else {
    $('.topnav a').removeClass('activeLink')
    $(`.topnav a[href="${hash}"]`).addClass('activeLink')
  }
}


// Elemet generate and return className
function elemGenerator(position, btn) {
  let elemName = `bef-${position}`;
  $(btn).css({cursor: 'not-allowed', backgroundColor: 'rgb(158, 157, 163)', color: 'rgb(91, 88, 88)'}).attr("disabled", true);

  $(`<p class="${elemName}"></p>`).insertBefore(`.${position}`);
  $(`.${elemName}`).text('Sending...').css({
    color: 'black',
    backgroundColor: 'dodgerblue',
    padding: '10px 10px 13px',
    display: 'none',
    textAlign: 'center',
    letterSpacing: '1px',
    borderRadius: '3px'
  }).slideDown();
  return '.' + elemName;
}


function ajaxRequest(url, data, messagePosition, btn) {
// verstka-1-emails

     $.ajax({
       url: `https://my-blog-uz.firebaseio.com/${url}.json`,
       data: JSON.stringify(data),
       type: 'POST',
       dataType: 'json'
     })
     .done(() => {
       $(messagePosition).text('Successfully sent!').css({
         color: 'white',
         backgroundColor: 'rgba(8, 164, 3, 0.9)'
       })
     })
     .fail(err => {
       $(messagePosition).text('Error occured!').css({
         color: 'white',
         backgroundColor: 'rgba(255, 28, 28, 0.88)'
       });
     })
     .always(() => {
       setTimeout(() => {

         $(messagePosition).slideUp();
         setTimeout(() => {
           $(messagePosition).remove()
           $(btn).css({cursor: 'pointer', backgroundColor: '', color: ''}).attr("disabled", false);
         }, 1200)
       }, 4000);
     });
}
