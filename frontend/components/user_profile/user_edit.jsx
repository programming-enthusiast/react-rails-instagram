import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import uploadRequest from 'superagent';

import Navigation from '../navigation/navigation_container';

const UPLOAD_PRESET = "appimage";
const UPLOAD_URL = " https://api.cloudinary.com/v1_1/cloneinstagram/image/upload";

class UserEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      username: "",
      name: "",
      bio: "",
      profile_pic_url: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhotoDrop = this.handlePhotoDrop.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handlePhotoDrop(photo) {
    this.handlePhotoUpload(photo[0]);
  }

  handlePhotoUpload(photo) {
    let upload = uploadRequest.post(UPLOAD_URL)
                        .field('upload_preset', UPLOAD_PRESET)
                        .field('file', photo);

    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        this.setState({
          profile_pic_url: response.body.secure_url
        });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.updateUser({user});
    this.props.history.push(`/${user.id}`);
  }

  render() {
    if(this.state.id === null) {
      this.state = this.props.user;
    }
    return(
      <div>
        <Navigation />
        <div className="edit-page">
          <div className="edit-frame-merge">
            <div className="edit-sub-frame-left">
              <h1 className="edit-title-text">Edit Profile</h1>
            </div>
            <div className="edit-sub-frame-right">
              <div className="edit-user-username-frame">
                  <div className="edit-user-pic-frame">
                    <Dropzone multiple={false} accept="image/*"
                      onDrop={this.handlePhotoDrop} className="edit-user-pic-button">
                      <img src={this.state.profile_pic_url} className="edit-user-pic"></img>
                    </Dropzone>
                  </div>
                  <div>
                    <h1 className="edit-user-username">{this.props.user.username}</h1>
                  </div>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="edit-user-input-frame">
                  <div className="edit-user-input">
                    <h1 className="edit-user-input-left">Name</h1>
                    <input type="text" onChange={this.update('name')} value={this.state.name} placeholder="Full Name" className="edit-user-input-right"></input>
                  </div>
                  <div className="edit-user-input">
                    <h1 className="edit-user-input-left">Username</h1>
                    <input type="text" onChange={this.update('username')} value={this.state.username} placeholder="username" className="edit-user-input-right"></input>
                  </div>
                  <div className="edit-user-input">
                    <h1 className="edit-user-input-left">Bio</h1>
                    <input type="text" onChange={this.update('bio')} value={this.state.bio} placeholder="Bio" className="edit-user-input-right"></input>
                  </div>
                  <div className="edit-user-input">
                    <h1 className="edit-user-input-left"> </h1>
                    <input type="submit" value="Submit" className="edit-user-input-right-button"></input>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


export default UserEdit;
