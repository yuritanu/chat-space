$(function(){
      function buildHTML(message){
        if (message.image) {
          var html = 
          `<div class="main__message-list" data-message-id=${message.id}>
              <div class="message">
                <div class="message_user">
                  ${message.user_name}
                </div>
                <div class="message_date">
                  ${message.created_at}
                </div>
              </div>
              <div class="message_chat">
                <p class="message_chat__body">
                  ${message.body}
                </p>
              </div>
              <img src=${message.image} >
            </div> `
          return html;
        } else {
          var html = 
            `<div class="main__message-list" data-message-id=${message.id}>
                <div class="message">
                  <div class="message_user">
                    ${message.user_name}
                  </div>
                  <div class="message_date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message_chat">
                  <p class="message_chat__body">
                    ${message.body}
                  </p>
                </div>
            </div>` 
          return html;
        };  
      }
  var reloadMessages = function(){
    var last_message_id = $('.main__message-list').last().data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.main__message-list').append(insertHTML);
        $('.main__message-list').animate({scrollTop: $('.main__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.main__message').append(html);
        $('.main__message').animate({ scrollTop: $('.main__message')[0].scrollHeight});
        $('form')[0].reset();
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      })
      
      .always(function() {
        $(".submit_btn").removeAttr("disabled");
      });
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  } 
});