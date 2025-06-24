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
import _ from "lodash";

const mdParser = new MarkdownIt();
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
      listDoctor: [],
      hasData: false,

      // Doctor info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpecialty: [],
      listClinic: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedSpecialty: "",
      selectedClinic: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    }

  }

  componentDidMount() {
    this.props.getAllDoctor();
    this.props.getRequiredDoctorInfo();
  }

  componentDidUpdate(prevProps, prevSate) {
    // BUILD DATA SELECT DOCTOR
    if (prevProps.doctors !== this.props.doctors) {
      let dataSelect = this.buildDataSelect(this.props.doctors, 'USER');
      this.setState({ listDoctor: dataSelect });
    }
    // HANDLE CHANGE LANGUAGE
    if (prevProps.language !== this.props.language) {
      const { doctors, allRequiredData } = this.props;
      if (this.props.doctors.length > 0) {
        let dataSelect = this.buildDataSelect(doctors, 'USER');

        this.setState({
          listDoctor: dataSelect,
        });
      }
      if (!_.isEmpty(this.props.allRequiredData)) {

        const resPayment = this.buildDataSelect(allRequiredData.resPayment, 'PAYMENT');
        const resPrice = this.buildDataSelect(allRequiredData.resPrice, 'PRICE');
        const resProvince = this.buildDataSelect(allRequiredData.resProvince, 'PROVINCE');
        const resSpecialty = this.buildDataSelect(allRequiredData.resSpecialty, 'SPECIALTY');
        const resClinic = this.buildDataSelect(allRequiredData.resClinic, 'CLINIC');

        this.setState({
          listPrice: resPrice,
          listProvince: resProvince,
          listPayment: resPayment,
          listSpecialty: resSpecialty,
          listClinic: resClinic,
        });
      }

    }
    // SET STATE FOR DATA DOCTOR INFO
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      const { detailDoctor } = this.props;
      if (!_.isEmpty(detailDoctor) && detailDoctor.description) {
        const { description, contentHTML, contentMarkdown, doctorInfo } = detailDoctor;
        const { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;
        this.setState({
          description: description, contentHTML: contentHTML,
          contentMarkdown: contentMarkdown, hasData: true,
        });
        console.log("Check doctorInfo: ", doctorInfo);
        if (doctorInfo) {
          this.setState({
            selectedPrice: listPrice.find(item => item.value === doctorInfo.priceId),
            selectedPayment: listPayment.find(item => item.value === doctorInfo.paymentId),
            selectedProvince: listProvince.find(item => item.value === doctorInfo.provinceId),
            selectedSpecialty: listSpecialty.find(item => item.value === doctorInfo.specialtyId),
            selectedClinic: listClinic.find(item => item.value === doctorInfo.clinicId),
            nameClinic: doctorInfo.nameClinic,
            addressClinic: doctorInfo.addressClinic,
            note: doctorInfo?.note || "",
          });
        } else {
          this.setState({
            selectedPrice: "", selectedPayment: "", selectedProvince: "",
            selectedSpecialty: "", selectedClinic: "", nameClinic: "",
            addressClinic: "", note: "",
          })
        }
      } else {
        console.log("Here")
        this.setState({
          description: "", contentHTML: "", contentMarkdown: "", hasData: false,
        });
      }
    }
    // BUILD DATA SELECT DOCTOR INFO
    if (prevProps.allRequiredData !== this.props.allRequiredData) {
      const { allRequiredData } = this.props;
      const resPayment = this.buildDataSelect(allRequiredData.resPayment, 'PAYMENT');
      const resPrice = this.buildDataSelect(allRequiredData.resPrice, 'PRICE');
      const resProvince = this.buildDataSelect(allRequiredData.resProvince, 'PROVINCE');
      const resSpecialty = this.buildDataSelect(allRequiredData.resSpecialty, 'SPECIALTY');
      const resClinic = this.buildDataSelect(allRequiredData.resClinic, 'CLINIC');

      this.setState({
        listPrice: resPrice,
        listProvince: resProvince,
        listPayment: resPayment,
        listSpecialty: resSpecialty,
        listClinic: resClinic,
      })
    }
  }

  buildDataSelect = (data, type) => { // type: USER || PAYMENT & PRICE & PROVINCE
    let result = [];
    const { language } = this.props;
    if (data && data.length > 0) {
      data.forEach((item) => {
        if (type === 'USER' || type === 'PAYMENT' || type === 'PROVINCE') {
          let object = {};
          let labelVi = type === 'USER' ? `${item.lastName} ${item.firstName}` : item.valueVi;
          let labelEn = type === 'USER' ? `${item.firstName} ${item.lastName}` : item.valueEn;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = type === 'USER' ? item.id : item.keyMap;

          result.push(object);
        } else if (type === 'PRICE') {
          let object = {};
          let labelVi = `${item.valueVi} VNĐ`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;

          result.push(object);
        } else if (type === 'SPECIALTY' || type === 'CLINIC') {
          let object = {};
          object.label = item.name;
          object.value = item.id;

          result.push(object);
        }
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
    console.log("Check state: ", this.state);
    const { hasData } = this.state;
    if (!this.state.contentHTML || !this.state.contentMarkdown || !this.state.description || !this.state.selectedDoctor.value || !this.state.selectedPrice || !this.state.selectedPayment || !this.state.selectedSpecialty || !this.state.selectedProvince || !this.state.selectedClinic || !this.state.nameClinic || !this.state.addressClinic) {
      toast.warn("Missing required params");
      return;
    }
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      selectedSpecialty: this.state.selectedSpecialty.value,
      selectedClinic: this.state?.selectedClinic?.value ?? "0",
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
    this.setState({
      hasData: true
    })
  }

  handleChange = async (selectedDoctor) => {
    const { getDetailDoctor } = this.props;
    this.setState({ selectedDoctor });
    await getDetailDoctor(selectedDoctor.value, true);
  };
  handleChangeText = (event, name) => {
    this.setState({ [name]: event.target.value });
  }

  handleSelectOption = (selected, { name }) => {
    this.setState({ [name]: selected });
  }

  render() {
    console.log("Check detail doctor: ", this.props.detailDoctor)
    const { selectedDoctor, description, listDoctor, contentMarkdown, hasData, listPrice, listPayment, listProvince, listSpecialty, listClinic, selectedPrice, selectedPayment, selectedProvince, selectedSpecialty, selectedClinic, nameClinic, addressClinic, note } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"> <FormattedMessage id="admin.manage-doctor.title" /> </div>
        <div className="more-info">
          <div className="content-left form-group">
            <label className="form-label"> <FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
            <Select value={selectedDoctor} onChange={this.handleChange}
              options={listDoctor} placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />} />
          </div>
          <div className="content-right form-group">
            <label className="form-label"><FormattedMessage id="admin.manage-doctor.intro" /></label>
            <textarea className="form-control" rows={4} onChange={(e) => this.handleChangeText(e, 'description')} value={description}></textarea>
          </div>
        </div>
        <div className="more-info-extra row mb-3">
          <div className="col-4 form-group mb-3">
            <label className="form-label"><FormattedMessage id="admin.manage-doctor.price" /></label>
            <Select value={selectedPrice} onChange={this.handleSelectOption} name='selectedPrice'
              options={listPrice} placeholder={<FormattedMessage id="admin.manage-doctor.price" />} />
          </div>
          <div className="col-4 form-group mb-3">
            <label className="form-label"><FormattedMessage id="admin.manage-doctor.payment" /></label>
            <Select value={selectedPayment} onChange={this.handleSelectOption} name='selectedPayment'
              options={listPayment} placeholder={<FormattedMessage id="admin.manage-doctor.payment" />} />
          </div>
          <div className="col-4 form-group mb-3">
            <label className="form-label"><FormattedMessage id="admin.manage-doctor.province" /></label>
            <Select value={selectedProvince} onChange={this.handleSelectOption} name='selectedProvince'
              options={listProvince} placeholder={<FormattedMessage id="admin.manage-doctor.province" />} />
          </div>
          <div className="col-4 form-group mb-3">
            <label className="form-label"><FormattedMessage id="admin.manage-doctor.clinic-name" /></label>
            <input className="form-control" value={nameClinic} onChange={(e) => this.handleChangeText(e, 'nameClinic')} />
          </div>
          <div className="col-4 form-group mb-3">
            <label className="form-label"><FormattedMessage id="admin.manage-doctor.clinic-address" /></label>
            <input className="form-control" value={addressClinic} onChange={(e) => this.handleChangeText(e, 'addressClinic')} />
          </div>
          <div className="col-4 form-group mb-3">
            <label className="form-label"><FormattedMessage id="admin.manage-doctor.note" /></label>
            <input className="form-control" value={note} onChange={(e) => this.handleChangeText(e, 'note')} />
          </div>
          <div className="col-4 form-group mb-3">
            <label className="form-label">Chọn chuyên khoa</label>
            <Select value={selectedSpecialty} onChange={this.handleSelectOption} name='selectedSpecialty'
              options={listSpecialty} placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />} />
          </div>
          <div className="col-4 form-group mb-3">
            <label className="form-label">Chọn phòng khám</label>
            <Select value={selectedClinic} onChange={this.handleSelectOption} name='selectedClinic'
              options={listClinic} placeholder={<FormattedMessage id="admin.manage-doctor.clinic" />} />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor value={contentMarkdown} style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
          <button className={`${hasData ? "update-content-editor" : ""} save-content-doctor`} onClick={() => this.handleSaveContentMarkdown()}>
            {hasData ? <FormattedMessage id="admin.manage-doctor.save" /> : <FormattedMessage id="admin.manage-doctor.add" />}
          </button>
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
    allRequiredData: state.admin.allRequiredData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllDoctor: () => dispatch(actions.getAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getDetailDoctor: (doctorId, hasMarkdown) => dispatch(actions.getDetailDoctor(doctorId, hasMarkdown)),
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
