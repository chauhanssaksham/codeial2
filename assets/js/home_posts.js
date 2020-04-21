{
    let addNewPosttoDom = (post)=>{
        let Container = $('#all-posts');
        let newElement = `<li class="collection-item" id="post-${post._id}">
        <h6>
            <b>${post.user.name}</b>
                <a class="delete-post-btn btn-floating right btn-small waves-effect waves-light red" href="/posts/destroy/${post._id}"><i class="material-icons">delete</i></a>
        </h6>
        <p>${post.content}</p>
            <form action="/comments/create" method="POST">
                <div class="row">
                    <div class="input-field col s10 m9">
                        <input id="comment-input" type="text" name="content" required></input>
                        <label for="comment-input">Comment</label>
                        <input type="hidden" name="post" value="${post._id}"></input>
                    </div>
                    <div class="input-field col s1">
                        <button class="btn btn-floating btn-medium waves-effect waves-light cyan" type="submit" name="action">
                            <i class="material-icons right">chevron_right</i>
                        </button>
                    </div>
                </div>
            </form>
        <div class="row">
            <div class="col s11 offset-s1" id="post-comments-${post._id}">
            </div>
        </div>
    </li>`;
    Container.prepend(newElement);
    }
    let createPost = ()=>{
        let newPostForm = $('#new-post-form');

        newPostForm.submit(e => {
            e.preventDefault();

            $.ajax({
                type:'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: (data)=>{
                    console.log(data.data);
                    addNewPosttoDom(data.data);
                },
                error: (error)=>{
                    console.log(error.responseText);
                }
            })
        });
    }

    createPost();
}