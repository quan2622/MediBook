import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import "./MangeDoctor.scss"
import Select from 'react-select'

const mdParser = new MarkdownIt();
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTMl: "",
      contentMarkdown: "",
      selectedOption: "",
      description: "",
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTMl: html,
      contentMarkdown: text,
    })
  }

  handleSaveContentMarkdown = () => {
    console.log("Check save content: ", this.state);
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  handleChangeDescripttion = (event) => {
    this.setState({ description: event.target.value });
  }

  render() {
    const { selectedOption, description } = this.state;
    console.log("my Check: ", this.state.description)
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"> Thêm thông tin bác sĩ</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label className="form-label">Chon bác sĩ</label>
            <Select value={selectedOption}
              onChange={this.handleChange} options={options} />
          </div>
          <div className="content-right form-group">
            <label className="form-label">Thông tin giới thiệu</label>
            <textarea className="form-control" rows={4} onChange={this.handleChangeDescripttion} value={description}></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
          <button className="save-content-doctor" onClick={() => this.handleSaveContentMarkdown()}>Lưu thông tin</button>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    userRedux: state.admin.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUser: () => dispatch(actions.getAllUser()),
    deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
