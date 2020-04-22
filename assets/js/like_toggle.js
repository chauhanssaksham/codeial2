$(function(){
    let toggleLike = (element, deleted)=>{
        let likeCount = parseInt(element.next().find('span').text());
        if (deleted){
            element.text('Like');
            likeCount--;
        } else{
            element.text('Unlike');
            likeCount++;
        }
        element.next().find('span').text(likeCount);
    }
    $('.toggle-like').on('click', function(e){
        let $this = $(this);
        e.preventDefault();
        $.ajax({
            type:'post',
            url: $(this).attr('href'),
            success: (data)=>{
                toggleLike($(this), data.data.deleted);
            }, error: (error)=>{
                console.log(error.responseText); 
            }
        })
    });
});