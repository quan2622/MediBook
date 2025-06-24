import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageClinic.scss"
import * as actions from "../../../store/actions"
import { FormattedMessage } from "react-intl";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from "../../../utils";
import userService from "../../../services/user.service";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameClinic: "",
      imageClinic: "", //base64
      addressClinic: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      imageKey: Date.now(),
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {

  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text
    })
  }

  handleOnChangeInput = async (e, id) => {
    if (id === "imageClinic") {
      if (e.target && e.target.files && e.target.files[0]) {
        this.setState({ [id]: await CommonUtils.getBase64(e.target.files[0]), });
      }
    } else {
      this.setState({ [id]: e.target.value });
    }
  }

  handleSaveNewClinic = async () => {
    console.log("Check data save: ", this.state);
    const res = await userService.createNewClinic({
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      imageClinic: this.state.imageClinic,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown
    });

    if (res && res.EC === 0) {
      toast.success(res.EM);
      this.setState({
        nameClinic: "",
        imageClinic: "", //base64
        addressClinic: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        imageKey: Date.now(),
      })

    } else toast.error(res.EM);
  }

  render() {
    const { descriptionMarkdown, nameClinic, addressClinic, imageKey } = this.state;


    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý phòng khám</div>
        <div className="add-new-specialty">
          <div className="row mb-3">
            <div className="col-6 form-group">
              <label className="form-label">Tên phòng khám</label>
              <input className="form-control" type="text" value={nameClinic} onChange={(e) => this.handleOnChangeInput(e, 'nameClinic')} />
            </div>
            <div className="col-6 form-group">
              <label className="form-label">Địa chỉ phòng khám</label>
              <input className="form-control" type="text" value={addressClinic} onChange={(e) => this.handleOnChangeInput(e, 'addressClinic')} />
            </div>
            <div className="col-6 form-group mt-2">
              <label className="form-label">Ảnh phòng khám</label>
              <input className="form-control" type="file" onChange={(e) => this.handleOnChangeInput(e, 'imageClinic')} key={imageKey} />
            </div>
          </div>
          <MdEditor
            style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
            value={descriptionMarkdown}
            onChange={this.handleEditorChange}
          />
          <button className="btn-save-new-specialty" onClick={this.handleSaveNewClinic}>Save</button>
        </div>
        <div className="all-specialty">

        </div>

      </div >
    );
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getDetailDoctor: (doctorId) => dispatch(actions.getDetailDoctor(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
