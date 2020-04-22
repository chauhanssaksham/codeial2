$(function(){
    let addCommentToDOM = (comment)=>{
        let container = $(`#post-comments-${comment.post}`);
        let newElement = `<div class="row">
                <div class="col s5">
                    <b>${comment.user.name}</b> 
                </div>
                <div class="col s12">
                    ${comment.content}
                        <a class="btn-floating right btn-small waves-effect waves-light red" href="/comments/destroy/${comment._id}"><i class="material-icons">delete</i></a>
                </div>
            </div>`;
        container.prepend(newElement);
    }
    let createPost = ()=>{
        console.log("achha");
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
                    },
                    error: (error)=>{
                        console.log(error.responseText);
                    }
                });
            });

        });
    }
    createPost();
});