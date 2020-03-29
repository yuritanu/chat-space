$(function(){
      function buildHTML(message){
        if (message.image) {
          var html = 
          `<div class="main__message-list">
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
            `<div class="main__message-list">
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
});