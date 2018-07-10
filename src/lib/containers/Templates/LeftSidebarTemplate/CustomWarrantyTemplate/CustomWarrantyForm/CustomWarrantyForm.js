// @flow
import * as React from 'react'
import type { PrintableType } from '../../../../../../api/warranty_client'
import WarrantyAPIClient from '../../../../../../api/warranty_client'
import BCorpInputField from '../../../../../components/BCorpFilterField/BCorpInputField'
import BCorpSelectField from '../../../../../components/BCorpFilterField/BCorpSelectField'
import ContentTransformer from '../../../../../components/ContentTransformer/ContentTransformer'
import style from './CustomWarrantyForm.scss'

type Props = {
  description?: string,
  renderDescription?: () => React.Node
}

type State = {
  warrantyOptions: { [string | number]: ?string },
  form: PrintableType
}

class CustomWarrantyForm extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      form: {},
      warrantyOptions: {}
    }
  }

  componentDidMount () {
    this.getWarranties()
  }

  updateCustomerName (event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({
      form: { ...this.state.form, customerName: event.target.value }
    })
  }
  updateJobName (event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ form: { ...this.state.form, jobName: event.target.value } })
  }
  updatePurchaseOrder (event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({
      form: { ...this.state.form, purchaseOrder: event.target.value }
    })
  }
  updateInvoice (event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ form: { ...this.state.form, invoice: event.target.value } })
  }
  updateInvoiceDate (event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({
      form: { ...this.state.form, invoiceDate: event.target.value }
    })
  }
  updateWarrantyID (event: SyntheticInputEvent<HTMLSelectElement>) {
    this.setState({
      form: { ...this.state.form, warrantyID: parseInt(event.target.value) }
    })
  }

  render () {
    return (
      <form
        onSubmit={this.getPrintableCustomWarranty.bind(this)}
        className={style.customWarrantyForm}>
        <div className={style.selectWrapper}>
          <BCorpSelectField
            options={this.state.warrantyOptions}
            filterState={this.state.form.warrantyID || 0}
            handleChange={this.updateWarrantyID.bind(this)}
            defaultOptionId={0}
            defaultOptionName={'Select Warranty Type'}
            className={style.select}
          />
        </div>

        <div className={style.description}>
          {this.props.description && (
            <ContentTransformer content={this.props.description} />
          )}
          {this.props.renderDescription && this.props.renderDescription()}
        </div>

        <div className={style.inputs}>
          <BCorpInputField
            filterState={this.state.form.customerName}
            handleChange={this.updateCustomerName.bind(this)}
            placeholder={'Customer Name'}
            className={style.inputWrapper}
          />
          <BCorpInputField
            filterState={this.state.form.jobName}
            handleChange={this.updateJobName.bind(this)}
            placeholder={'Job Name'}
            className={style.inputWrapper}
          />
          <BCorpInputField
            filterState={this.state.form.purchaseOrder}
            handleChange={this.updatePurchaseOrder.bind(this)}
            placeholder={'Purchase Order #'}
            className={style.inputWrapper}
          />
          <BCorpInputField
            filterState={this.state.form.invoice}
            handleChange={this.updateInvoice.bind(this)}
            placeholder={'Invoice #'}
            className={style.inputWrapper}
          />
          <BCorpInputField
            filterState={this.state.form.invoiceDate}
            handleChange={this.updateInvoiceDate.bind(this)}
            placeholder={'Invoice Date'}
            className={style.inputWrapper}
          />
        </div>

        <button type={'submit'}>Create Warranty</button>
      </form>
    )
  }

  async getWarranties () {
    try {
      const client = new WarrantyAPIClient()
      const response = await client.getLatest(-1)

      const warrantyOptions = {}
      response.data.map(warranty => {
        warrantyOptions[parseInt(warranty.post.ID)] =
          warranty.post.post_title || ''
      })

      this.setState({ warrantyOptions })
    } catch (err) {
      console.log(err)
      this.setState({ warrantyOptions: {} })
    }
  }

  async getPrintableCustomWarranty (event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(this.state.form)

    try {
      const client = new WarrantyAPIClient()
      const response = await client.getPrintable(this.state.form)

      const newWindow = window.open('', `Custom Warranty ${Date.now()}`)
      newWindow.document.write(response.data)
    } catch (err) {
      console.log(err)
    }
  }
}

export default CustomWarrantyForm