$(function(){
    let deleteCommentBind = function(href){
        $.ajax({
            type:'get',
            url: href,
            success: (data)=>{
                if(data.success){
                    removeCommentFromDOM(data.data);
                    new Noty({
                        theme: 'relax',
                        text: data.message,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                }
                else{
                    new Noty({
                        theme: 'relax',
                        text: data.message,
                        type: 'error',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                }
            },
            error: (error)=>{
                console.log(error.responseText);
            }
        });
    }
    let addCommentToDOM = (comment)=>{
        let container = $(`#post-comments-${comment.post}`);
        let newElement = `<div class="row" id="comment-${comment._id}">
                <div class="col s5">
                    <b>${comment.user.name}</b> 
                </div>
                <div class="col s12">
                    ${comment.content}
                        <a class="btn-floating right btn-small waves-effect waves-light red delete-comment-btn" href="/comments/destroy/${comment._id}"><i class="material-icons">delete</i></a>
                </div>
            </div>`;
        container.prepend(newElement);
    }
    let createComment = ()=>{
        $('.comments-input').each(function(){
            $(this).on('submit', function(e){
                e.preventDefault();
                // console.log($(this).serialize());
                $.ajax({
                    type:'post',
                    url:$(this).attr('action'),
                    data:$(this).serialize(),
                    success:(data)=>{
                        addCommentToDOM(data.data);
                        $(this).find('input[name="content"]').val('');
                        new Noty({
                            theme: 'relax',
                            text: data.message,
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                        }).show();
                    },
                    error: (error)=>{
                        new Noty({
                            theme: 'relax',
                            text: error.responseText,
                            type: 'error',
                            layout: 'topRight',
                            timeout: 1500
                        }).show();
                        console.log(error.responseText);
                    }
                });
            });

        });
    }
    let removeCommentFromDOM = (commentId) =>{
        $(`#comment-${commentId}`).remove();
    }
    $(document).on('click', '.delete-comment-btn', function(e){
        e.preventDefault();
        let href = $(this).attr('href');
        deleteCommentBind(href);
    });

    createComment();
});