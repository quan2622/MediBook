import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageSpecialty.scss"
import * as actions from "../../../store/actions"
import { FormattedMessage } from "react-intl";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from "../../../utils";
import userService from "../../../services/user.service";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSpecialty: "",
      imageSpecialty: "", //base64
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
    if (id === "imageSpecialty") {
      if (e.target && e.target.files && e.target.files[0]) {
        this.setState({ [id]: await CommonUtils.getBase64(e.target.files[0]), });
      }
    } else {
      this.setState({ [id]: e.target.value });
    }
  }

  handleSaveNewSpecialty = async () => {
    console.log("Check data save: ", this.state);
    const res = await userService.createNewSpecialty({
      nameSpecialty: this.state.nameSpecialty,
      imageSpecialty: this.state.imageSpecialty,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown
    });

    if (res && res.EC === 0) {
      toast.success(res.EM);
      this.setState({
        nameSpecialty: "",
        imageSpecialty: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        imageKey: Date.now(),
      })

    } else toast.error(res.EM);
  }

  render() {
    const { descriptionMarkdown, nameSpecialty, imageKey } = this.state;


    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý chuyên khoa</div>
        <div className="add-new-specialty">
          <div className="row mb-3">
            <div className="col-6 form-group">
              <label className="form-label">Tên chuyên khoa</label>
              <input className="form-control" type="text" value={nameSpecialty} onChange={(e) => this.handleOnChangeInput(e, 'nameSpecialty')} />
            </div>
            <div className="col-6 form-group">
              <label className="form-label">Ảnh chuyên khoa</label>
              <input className="form-control" type="file" onChange={(e) => this.handleOnChangeInput(e, 'imageSpecialty')} key={imageKey} />
            </div>
          </div>
          <MdEditor
            style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
            value={descriptionMarkdown}
            onChange={this.handleEditorChange}
          />
          <button className="btn-save-new-specialty" onClick={this.handleSaveNewSpecialty}>Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
