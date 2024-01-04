import React, { isValidElement, useState, useEffect } from "react"
import { Space, Button } from "antd-mobile"
import "./styles.less"

const IndexComponent = (props) => {
  const { lable, space, inputStyle, style, loading, actionFunc } = props
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState([])
  const [isDisable, setIsDisable] = useState(true)

  const chilrenElement = []
  React.Children.forEach(props.children, (child, index) => {
    const { type } = child || {}
    if (isValidElement(child) && type.displayName === "m_input_item") {
      const dataIndex = child.props.dataIndex
      const _child = React.cloneElement(child, {
        key: index,
        onChange: (_) => {
          setForm({...form, [dataIndex]: _})
        },
        onError: (_) => {
          const _index = errors.indexOf(dataIndex)
          if (_ && _index === -1) {
            const _errors = errors.concat()
            _errors.push(dataIndex)
            setErrors(_errors)
          } else if (!_ && _index !== -1) {
            const _errors = errors.concat()
            _errors.splice(_index, 1)
            setErrors(_errors)
          }
        },
        style: inputStyle
      })
      chilrenElement.push(_child)
    }
  })

  useEffect(() => {
    const values = Object.values(form)
    const noEmpty = values.every(value => value !== '')
    const _isDisable = values.length < chilrenElement.length || errors.length > 0 || !noEmpty
    setIsDisable(_isDisable)
  }, [form, chilrenElement.length, errors])

  return (
    <div className="m_form" style={style}>
      <Space direction="vertical" style={{ "--gap": `${space}px`, width: "100%" }}>{ chilrenElement }</Space>
      <Button block disabled={isDisable} loading={loading} className="m_form_button" onClick={() => actionFunc(form)}>{ lable }</Button>
    </div>
  )
}

export default IndexComponent