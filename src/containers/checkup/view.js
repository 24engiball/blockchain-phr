import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import moment from 'moment'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'

import { HeaderAction } from './../../redux/actions/header'
import { checkupAction } from './../../redux/actions/checkup'
import { permissionAction } from './../../redux/actions/permission'

import { _function } from './../../function'

require('moment/locale/th')

class CheckupViewerPage extends Component {
  state = {
    data: ''
  }
  setTitleBar(value) {
    this.props.setHeader(moment(value).format('LL'))
  }

  updateToread(data) {
    const data2 = { ...data }
    const assetId = data2.assetId
    delete data2.assetId
    delete data2.healthCareProviderId
    delete data2.healthCareProviderData
    delete data2.$class
    this.props.updateReadCheckupHistory(assetId, Object.assign(data2, {
      patientAcknowledgeDateTime: moment().toISOString()
    }))

    //Update 
  }
  componentWillMount() {
    if (this.props.location.state === undefined) {
      if (this.props.match.params.id) {
        const id = this.props.match.params.id
        this.props.getCheckup(id)
      } else {
        this.props.history.push('/checkup')
        return false
      }
    } else {
      let data = this.props.location.state.data
      const coreType = _function.popHash(data.$class, '.')
      if (coreType === 'CheckupResultProducedTransaction') {
        /* OPEN FROM NOTIFICATION PAGE */
        let _temp = data.healthCareProviderData
        data = data.checkupHistory
        data.healthCareProviderData = _temp
        //UPDATE READ 
        if (!data.patientAcknowledgeDateTime) {
          this.updateToread(data)
          this.props.receivesetDataOnReading()
        }
      }
      this.setState({
        data: data
      })
      this.setTitleBar(data.dateTimeServe)
    }
  }

  componentWillUpdate() {
    if (!isEmpty(this.props.checkup) && !this.props.header) {
      this.setTitleBar(this.props.checkup.dateTimeServe)
    }
  }

  render() {
    let data = this.state.data
    if (!data) {
      data = this.props.checkup
    }
    const { healthCareProvider } = { ...this.props }
    return (
      (!isEmpty(data) && !isEmpty(healthCareProvider)) &&
      <div className={`containerMain`}>
        <div className={`card`}>
          <table className={`tableView`}>
            <tbody>
              <tr>
                <td>alk</td>
                <td>:</td>
                <td>{data.alk}</td>
              </tr>
              <tr>
                <td>alm</td>
                <td>:</td>
                <td>{data.alm}</td>
              </tr>
              <tr>
                <td>Asset ID</td>
                <td>:</td>
                <td>{data.assetId}</td>
              </tr>
              <tr>
                <td>bun</td>
                <td>:</td>
                <td>{data.bun}</td>
              </tr>
              <tr>
                <td>CALCIUM SCORE</td>
                <td>:</td>
                <td>{data.calcium_score_result}</td>
              </tr>
              <tr>
                <td>cbc wbc</td>
                <td>:</td>
                <td>{data.cbc_wbc}</td>
              </tr>
              <tr>
                <td>chlt</td>
                <td>:</td>
                <td>{data.chlt}</td>
              </tr>
              <tr>
                <td>creatinine</td>
                <td>:</td>
                <td>{data.creatinine}</td>
              </tr>
              <tr>
                <td>eos</td>
                <td>:</td>
                <td>{data.eos}</td>
              </tr>
              <tr>
                <td>fbs</td>
                <td>:</td>
                <td>{data.fbs}</td>
              </tr>
              <tr>
                <td>hb</td>
                <td>:</td>
                <td>{data.hb}</td>
              </tr>
              <tr>
                <td>hba1c</td>
                <td>:</td>
                <td>{data.hba1c}</td>
              </tr>
              <tr>
                <td>hct</td>
                <td>:</td>
                <td>{data.hct}</td>
              </tr>
              <tr>
                <td>hdl</td>
                <td>:</td>
                <td>{data.hdl}</td>
              </tr>
              <tr>
                <td>Health Care Provider</td>
                <td>:</td>
                <td>{
                  data.healthCareProviderData ?
                    data.healthCareProviderData[0].healthCareProviderName : healthCareProvider.filter((Provider) => {
                      return Provider.healthCareProviderId === data.healthCareProviderId
                    })[0].healthCareProviderName
                }</td>
              </tr>
              <tr>
                <td>ldl</td>
                <td>:</td>
                <td>{data.ldl}</td>
              </tr>
              <tr>
                <td>lym</td>
                <td>:</td>
                <td>{data.lym}</td>
              </tr>
              <tr>
                <td>mono</td>
                <td>:</td>
                <td>{data.mono}</td>
              </tr>
              <tr>
                <td>ph</td>
                <td>:</td>
                <td>{data.ph}</td>
              </tr>
              <tr>
                <td>pmn</td>
                <td>:</td>
                <td>{data.pmn}</td>
              </tr>
              <tr>
                <td>pressure</td>
                <td>:</td>
                <td>{data.pressure}</td>
              </tr>
              <tr>
                <td>pulse</td>
                <td>:</td>
                <td>{data.pulse}</td>
              </tr>
              <tr>
                <td>rbc</td>
                <td>:</td>
                <td>{data.rbc}</td>
              </tr>
              <tr>
                <td>sgot</td>
                <td>:</td>
                <td>{data.sgot}</td>
              </tr>
              <tr>
                <td>sgpt</td>
                <td>:</td>
                <td>{data.sgpt}</td>
              </tr>
              <tr>
                <td>spgr</td>
                <td>:</td>
                <td>{data.spgr}</td>
              </tr>
              <tr>
                <td>sugar</td>
                <td>:</td>
                <td>{data.sugar}</td>
              </tr>
              <tr>
                <td>trig</td>
                <td>:</td>
                <td>{data.trig}</td>
              </tr>
              <tr>
                <td>ua_wbc</td>
                <td>:</td>
                <td>{data.ua_wbc}</td>
              </tr>
              <tr>
                <td>uric</td>
                <td>:</td>
                <td>{data.uric}</td>
              </tr>
            </tbody>
          </table>
          <Divider />
          <div className={`cardGroup`}>
            <div className={`cardHead`}>Conclusion</div>
            <div className={`normal`}>
              {data.conclusion}
            </div>
          </div>
          <div className={`cardGroup`}>
            <div className={`cardHead`}>Recommendation</div>
            <div className={`normal`}>
              {data.recommendation}
            </div>
            {/* <ul className={`normal`}>
              <li>ออกกำลังกายอย่างต่อเนื่อง อย่างน้อยวันละ 30 นาที เป็นเวลา 3-5 วันต่อสัปดาห์</li>
              <li>หลีกเลี่ยงอาหารที่มีน้ำตาลสูง เช่น น้ำอัดลม ขนมหวาน และผลไม้หวานจัด</li>
              <li>พยายามควบคุมน้ำหนักให้อยู่ใยเกณฑ์มาตรฐาน</li>
              <li>ควรตรวจ Caloum Score เพิ่มเติม</li>
            </ul> */}
          </div>
        </div>
      </div >
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    setHeader: (text) => {
      dispatch(HeaderAction.setHeader(text))
    },
    getCheckup: (assetId) => {
      dispatch(checkupAction.getCheckup(assetId))
    },
    updateReadCheckupHistory: (assetId, data) => {
      dispatch(checkupAction.updateReadCheckupHistory(assetId, data))
    },
    receivesetDataOnReading: () => {
      dispatch(permissionAction.receivesetDataOnReading(null, true))
    }
  }
}

const mapStateToProps = state => (
  {
    header: state.header.text,
    checkup: state.checkup.dataOnSelected.data,
    healthCareProvider: state.healthCareProvider.data
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CheckupViewerPage)