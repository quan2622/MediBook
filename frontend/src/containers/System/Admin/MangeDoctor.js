import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import "./MangeDoctor.scss"
import Select from 'react-select'
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedOption: "",
      description: "",
      listDoctor: [],
      hasData: false,
    }
  }

  componentDidMount() {
    this.props.getAllDoctor()
  }

  componentDidUpdate(prevProps, prevSate) {
    if (prevProps.doctors !== this.props.doctors) {
      let dataSelect = this.buildDataSelect(this.props.doctors);
      this.setState({ listDoctor: dataSelect });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataSelect(this.props.doctors);
      this.setState({ listDoctor: dataSelect });
    }
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      if (this.props.detailDoctor.description) {
        const { description, contentHTML, contentMarkdown } = this.props.detailDoctor;
        console.log("Check data detail: ", this.props.detailDoctor);
        this.setState({ description: description, contentHTML: contentHTML, contentMarkdown: contentMarkdown, hasData: true });
      } else {
        this.setState({ description: "", contentHTML: "", contentMarkdown: "", hasData: false });
      }
    }
  }

  buildDataSelect = (data) => {
    let result = [];
    const { language } = this.props;
    if (data && data.length > 0) {
      data.forEach((item) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;

        result.push(object);
      })
    }
    return result;
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    })
  }

  handleSaveContentMarkdown = () => {
    const { hasData } = this.state;
    if (!this.state.contentHTML || !this.state.contentMarkdown || !this.state.description || !this.state.selectedOption.value) {
      toast.warn("Missing required params");
      return;
    }
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
    // this.setState({
    //   contentHTML: "",
    //   contentMarkdown: "",
    //   description: "",
    //   doctorId: "",
    // });
  }

  handleChange = async (selectedOption) => {
    const { getDetailDoctor } = this.props;
    this.setState({ selectedOption });
    await getDetailDoctor(selectedOption.value, true);
  };
  handleChangeDescripttion = (event) => {
    this.setState({ description: event.target.value });
  }
  render() {
    const { selectedOption, description, listDoctor, contentMarkdown, hasData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"> Thêm thông tin bác sĩ</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label className="form-label">Chon bác sĩ</label>
            <Select value={selectedOption}
              onChange={this.handleChange} options={listDoctor} />
          </div>
          <div className="content-right form-group">
            <label className="form-label">Thông tin giới thiệu</label>
            <textarea className="form-control" rows={4} onChange={this.handleChangeDescripttion} value={description}></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor value={contentMarkdown} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
          <button className={`${hasData ? "update-content-editor" : ""} save-content-doctor`} onClick={() => this.handleSaveContentMarkdown()}>{hasData ? "Lưu thay đổi" : "Lưu thông tin"}</button>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    userRedux: state.admin.users,
    language: state.app.language,
    doctors: state.admin.doctorList,
    detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllDoctor: () => dispatch(actions.getAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getDetailDoctor: (doctorId, hasMarkdown) => dispatch(actions.getDetailDoctor(doctorId, hasMarkdown)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
