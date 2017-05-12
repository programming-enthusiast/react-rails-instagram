import React from 'react';

import { Link, withRouter } from 'react-router-dom';

import LikeContainer from '../like/like_container';
import CommentButton from '../comment/comment_button';
import CommentListContainer from '../comment/comment_list_container';
import CommentInputContainer from '../comment/comment_input_container';

class PostFeed extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="post-feed-frame">
        <header className="post-feed-user-info-frame">
          <Link to={`/${this.props.post.user_id}`}>
            <img src={this.props.post.user.profile_pic_url}
                className="post-detail-user-info-pic"></img>
          </Link>
          <div className="post-detail-user-info">
            <Link to={`/${this.props.post.user_id}`}>
              <h3 className="post-detail-user-info-username">
                {this.props.post.user.username}</h3>
            </Link>
            <h3>{this.props.post.location}</h3>
          </div>
        </header>
        <img src={this.props.post.photo_url} className="post-feed-photo"></img>

        <div className="post-feed-bottom-frame">
          <div className="like-and-comment-button-frame">
            <LikeContainer postId={this.props.post.id}
                          liked={this.props.post.liked}/>
          </div>
          <h3 className="like-count">
            {`${this.props.post.likes_count} `} likes
          </h3>
          <div className="post-feed-comment-frame">
            <CommentListContainer comments={this.props.post.comments}
                        postOwnerId={this.props.post.user_id}
                        username={this.props.post.user.username}
                        description={this.props.post.description}/>
          </div>
          <CommentInputContainer postId={this.props.post.id}/>
        </div>
      </div>

    );
  }
}

export default PostFeed;
