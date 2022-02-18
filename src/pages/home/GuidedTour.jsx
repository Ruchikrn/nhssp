import React, { Component } from 'react'
import Joyride, { STATUS } from 'react-joyride';
import {connect} from 'react-redux'
import { setHelpTour } from '../../actions/modalActions';

const steps = [
  {
    target: '.homepagesearch',
    content: 'बिभिन्न तहमा स्वास्थ्य क्षेत्रमा गरीएका सकारात्मक, रचनात्मक, सामन्यतया गरीरहेका भन्दा फरक नबिनतम् पहलहरुलाई एकै ठाँउमा संगालेर एक-आपसलाई सुसूचित गर्ने र सिकाई आदान-प्रदान गर्न सहजिकरण गर्ने उध्येश्यले यो पोर्टलको शुरुवात गरिएको हो। पोर्टलमा प्रकाशित नबिन्तम पहलहरु प्रदेश, जिल्ला वा स्थानिय तहका आधारमा खोज्न सक्नुहुन्छ',
    disableBeacon: true,
    placement: 'right-start'
  },
  {
    target: '.practicelistnav',
    content: 'प्रकाशित पहलहरु हेर्न र अन्य खोजी उपकरणहरू प्रयोग गरि पहलहरु खोज्न यहाँ क्लिक गर्नुहोस्',
    disableBeacon: true,
  },
  {
    target: '.provinciallistnav',
    content: 'एस पोर्टलमा संघीय तहका पहलहरु पनि  हेर्न सक्नुहुन्छ ',
    disableBeacon: true,
  },
  {
    target: '.newpracticeregistrationlink',
    content: 'नयाँ पहल दर्ता गराउन यो मेनु प्रयोग गर्नुहोस्',
    disableBeacon: true,
  },
  {
    target: '.aboutbutton',
    content: 'पोर्टलको बारेमा थप जानकारी पाउन यो प्रयोग गर्नुहोस् ',
    disableBeacon: true,
  },
]

const styles = {
  primaryColor: '#28a745'
}

class GuidedTour extends Component {
  handleJoyrideCallback = data => {
    const { status } = data;
     if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.props.setHelpTour(false)
    }
  };
  render() {
    return (
      <Joyride
        steps={steps}
        locale={{ back: 'Back', close: 'Close', last: 'Last', next: 'Next', skip: 'Skip' }}
        disableOverlayClose={true}
        styles={{ options: styles }}
        showSkipButton={true}
        scrollToFirstStep={true}
        showProgress={false}
        continuous={true}
        run={window.innerWidth >= 760 && this.props.runTour}
        callback={this.handleJoyrideCallback}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    runTour: state.modal.helpTour
  };
}

const mapDispatchToProps = {
  setHelpTour
}

export default connect(mapStateToProps, mapDispatchToProps)(GuidedTour);
