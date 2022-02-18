import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom'
import mainLogo from '../logo.png'

import { connect } from 'react-redux'
import { toggleAboutModal } from '../actions/modalActions';

const fontStyle = {
    'font-size': '1.1rem'
}

class AboutModal extends Component {
    render() {
        return (
          <Modal
            isOpen={this.props.isOpen}
            toggle={this.props.toggle}
            className={this.props.className}
            size="lg"
          >
            <ModalHeader toggle={this.props.toggle}>
              <img
                className="img img-responsive"
                src={mainLogo}
                alt="Logo of Ministry of Health and Population"
              />
            </ModalHeader>
            <ModalBody style={fontStyle}>
              <h5 className="text-center">यस पोर्टलका बारेमा</h5>
              <p>
                बिभिन्न तहमा स्वास्थ्य क्षेत्रमा गरीएका सकारात्मक, रचनात्मक,
                सामन्यतया गरीरहेका भन्दा फरक नबिनतम् पहलहरुलाई एकै ठाँउमा
                संगालेर एक-आपसलाई सुसूचित गर्ने र सिकाई आदान-प्रदान गर्न सहजिकरण
                गर्ने उध्येश्यले यो पोर्टलको शुरुवात गरिएको हो। यस पोर्टलमा
                संग्रहित सामाग्रीहरुलाई बिभिन्न स्रोतहरुबाट संकलन गरिएको छ । यस
                पोर्टलमा उद्धृत विवरणका बारेमा थप जानकारी लिनका लागि वा कुनै फरक
                तथ्य वा दुविधा भएमा सम्बन्धित कार्यालयमा सिधै सम्पर्क गर्नुहुन
                वा आधिकारिक दस्तावेज हेर्नुहुन अनुरोध छ । कुनै फरक वा दुविधा
                भएमा सम्बन्धित निकायका आधिकारिक दस्तावेज वा आधिकारिक ब्यक्तिले
                दिएको जवाफले मान्यता पाउनेछन् ।
              </p>
              <p>
                स्वास्थ्य क्षेत्रमा गरिएका अन्य सकारात्मक, रचनात्मक, भईरहेका
                भन्दा फरक नबिनतम् पहलहरुका बारेमा आवश्यक जानकरी दिईएको खाकामा
                उपलब्ध गराई वा स्वास्थ्य तथा जनसंख्या मन्त्रालयको समन्वय शाखामा
                पत्राचार गरी सहयोग गरीदिनु हुन सबै संघीय सरकार, प्रदेश सरकार,
                स्थानीय सरकार तथा मातहतका निकायहरुलाई अनुरोध गरिन्छ ।
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.props.toggle}>
                यो बन्द गर्नुहोस्
              </Button>{' '}
            </ModalFooter>
          </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.modal.about
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggle: () => dispatch(toggleAboutModal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AboutModal);