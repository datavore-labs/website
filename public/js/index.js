$('#what .card').on('click', function() {
    $(this).toggleClass('flipped');
});

if ($('#header').length) {
    var highlightCounter = 1;
    var hasHighlight = false;

    function changeHighlight() {
        if (!hasHighlight) {
            if (highlightCounter > 2) {
                highlightCounter = 1;
            }
            $('#header').attr('data-highlight', highlightCounter);
            highlightCounter++;
            hasHighlight = true;

            setTimeout(function() {
                $('#header').removeAttr('data-highlight');
                hasHighlight = false;
            }, 5000);
        }
    }

    setTimeout(function() {
       setInterval(changeHighlight, 20000);
       changeHighlight();
    }, 10000);
}

// parallax animation for divider section
// init controller
var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

// build scenes
new ScrollMagic.Scene({triggerElement: "#who"})
    .setTween("#who > div.bg", {y: "80%", ease: Linear.easeNone})
    .addTo(controller);

new ScrollMagic.Scene({triggerElement: ".parallax-lines"})
    .setTween(".parallax-lines > div.bg:nth-child(1)", {x: "20%", ease: Linear.easeNone})
    .addTo(controller);

new ScrollMagic.Scene({triggerElement: ".parallax-lines"})
    .setTween(".parallax-lines > div.bg:nth-child(2)", {x: "10%", ease: Linear.easeNone})
    .addTo(controller);

new ScrollMagic.Scene({triggerElement: ".parallax-lines"})
    .setTween(".parallax-lines > div.bg:nth-child(3)", {x: "5%", ease: Linear.easeNone})
    .addTo(controller);

// MailChimp Form
var form = $('#mc-embedded-subscribe-form');

if (form.length) {
    var formEmail = form.find('input[name="EMAIL"]');

    window.fnames = new Array();
    window.ftypes = new Array();

    fnames[0]='EMAIL';
    ftypes[0]='email';

    function enableForm() {
        form.find('button[type="submit"]').removeAttr('disabled');
        form.removeClass('disabled');
    }

    function disableForm() {
        $('.mc-field-error').remove();
        form.find('button[type="submit"]').attr('disabled', 'disabled');
        form.addClass('disabled');
    }

    function getAjaxSubmitUrl() {
        var url = form.attr("action");
        url = url.replace("/post?u=", "/post-json?u=");
        url += "&c=submitCallback";
        return url;
    }

    function showError(message) {
        $('.mc-field-error').remove();
        $('<div class="mc-field-error">' + message + '</div>').insertAfter(form.find('#mc_embed_signup_scroll'));
    }

    window.submitCallback = function submitCallback(response) {
        if (response.result === 'success') {
            form.replaceWith($('<div class="email-capture" id="email-thanks"><span>Thanks for signing up. We\'re glad you love data as much as we do.</span></div>'));
        }
        else {
            enableForm();
            showError(response.msg);
        }
    }

    form.on('submit', function(e) {
        e.preventDefault();

        if (!formEmail.val() || formEmail.val().trim().length === 0) {
            return false;
        }

        disableForm();

        var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        var valid = formEmail.val().match(emailRegex) !== null;

        if (!valid) {
            //show error message
            enableForm();
            showError('Please enter a valid email address.');
            return false;
        }
        else {
            $.ajax({
                url: getAjaxSubmitUrl(),
                dataType: 'jsonp',
                data: form.serialize()
            });
        }
    });
}