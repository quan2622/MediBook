import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableManageUser.scss"
import * as actions from "../../../store/actions"
import { Editor } from '@tinymce/tinymce-react';
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: []
    }
    this.editorRef = React.createRef();
  }


  componentDidMount = () => {
    this.props.getAllUser();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { userRedux } = this.props;
    if (prevProps.userRedux !== userRedux)
      this.setState({ dataTable: [...userRedux] })
  }

  handleDelete = (userId) => {
    this.props.deleteUser(userId);
  }

  handleUpdate = (user) => {
    this.props.handleEditUser(user)
  }

  render() {
    const { dataTable } = this.state;
    return (
      <>
        <table id="TableManageUser" className="mb-5">
          <thead>
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataTable && dataTable.length > 0 && dataTable.map((item, index) => (
              <tr key={item.id}>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td className="table_action">
                  <button className="btn-edit" onClick={() => this.handleUpdate(item)}>
                    <i className="far fa-edit"></i>
                  </button>
                  <button className="btn-delete" onClick={() => this.handleDelete(item.id)}>
                    <i className="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Editor
          onInit={(event, editor) => this.editorRef.current = editor}
          apiKey={process.env.REACT_APP_TINYMCE_API}
          init={{
            plugins: [
              'anchor', 'autolink', 'charmap', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
              'mediaembed', 'casechange', 'formatpainter', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'editimage', 'mentions', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
            ],
            toolbar: 'undo redo image | blocks fontfamily fontsize | bold italic underline strikethrough | link  media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            image_title: true,
            automatic_uploads: true,
            file_picker_types: 'image',
            paste_data_images: true,
            images_file_types: 'jpeg,jpg,png,gif,bmp,webp,svg',
            file_picker_callback: (cb, value, meta) => {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.addEventListener('change', (e) => {
                const file = e.target.files[0];

                const reader = new FileReader();
                reader.addEventListener('load', () => {
                  const id = 'blobid' + (new Date()).getTime();
                  const blobCache = this.editorRef.current.editorUpload.blobCache;
                  const base64 = reader.result.split(',')[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  cb(blobInfo.blobUri(), { title: file.name });
                });
                reader.readAsDataURL(file);
              });

              input.click();
            },
          }}
        />

      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
