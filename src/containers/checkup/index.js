import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import CardComponent from './components/card'

import { checkupAction } from './../../redux/actions/checkup'
import { patientAction } from './../../redux/actions/patient'

class CheckupPage extends Component {
  // componentWillMount() {
  //   this.props.getPatient()
  // }

  render() {
    const { patientId, patients, configs, err, checkup } = { ...this.props }
    console.log(patients)
    if (isEmpty(patients) && !err) {
      this.props.getPatient(configs, patientId)
    }
    if (isEmpty(checkup) && !err) {
      this.props.getAllCheckup(configs, patientId)
    }

    let renderHTML = (
      <div> Loading... </div>
    )
    if (!isEmpty(checkup)) {
      // const { patientIdParam, healthCareProvider, dateTimeServe } = { ...checkup }
      renderHTML = (
        <div>
          <div>รายการประวัติ: <span>{patients.prename}{patients.name} {patients.surname}</span></div>
          {
            checkup.map((v, i) => {
              return (
                <div key={v.checkupHistoryId}>
                  <Link to={`/checkup/${v.checkupHistoryId}`}> <CardComponent data={v} /> </Link>
                </div>
              )
            })
          }

        </div>
      )
    }
    return (
      <div className='containerMain'>
        <div className='card'>
          {renderHTML}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    getAllCheckup: (configs, patientId) => {
      dispatch(checkupAction.getAllCheckup(configs, patientId))
    },
    getPatient: (configs, patientId) => {
      dispatch(patientAction.getPatient(configs, patientId))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    patients: state.patient.data,
    configs: state.firebase.data.configs,
    err: state.fetchError.modalOpen,
    checkup: state.checkup.data
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CheckupPage)