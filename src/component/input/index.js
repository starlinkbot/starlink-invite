/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Input, SpinLoading } from "antd-mobile"
import { useLocalStore, useTemporaryStore } from "@/store"
import { useCountdown, useClass } from "@/hook"
import { mathematics } from "@/util"
import { useTranslation } from "react-i18next"
import { IMAGE } from "@/assets"
import "./styles.less"

const IndexComponent = (props) => {
  const { t } = useTranslation()
  const { dataIndex, defaultValue, label, placeholder, isPassword, isPhone, isNumber, isInt, isTextCenter, isDisabled, rule, onVerification, onForget, onChange, onError, onMax, style, rightExtraDom, bottomExtraDom, onSpecialMax } = props
  const location = useLocation()
  const inputRef = useRef()
  const { lState } = useLocalStore()
  const { tDispatch, tState } = useTemporaryStore()
  const { classNames } = useClass()
  const countdown = useCountdown()
  const { pathname } = location
  const isSignup = pathname.startsWith("/signup")
  const isForget = pathname.startsWith("/forget")
  const isEmail = pathname.startsWith("/email")
  const { lInfo } = lState
  const { tEmail, tNewEmail } = tState
  const _email = 
    isSignup || isForget ? 
      tEmail 
    : isEmail && dataIndex === "newEmailCode" ? 
      tNewEmail 
    : 
      lInfo?.email
  const [value, setValue] = useState("")
  const [focused, setFocus] = useState(false)
  const [errored, setError] = useState(false)
  const [sendLoad, setSendLoad] = useState(false)
  const [visiblePassword, setVisiblePassword] = useState(false)

  useEffect(() => {
    if (dataIndex === "email" || dataIndex === "newEmail") {
      tDispatch({key: "tEmail", value: ""})
      tDispatch({key: "tNewEmail", value: ""}) 
    }
  }, [dataIndex])

  useEffect(() => {
    if (defaultValue === 0 || !!defaultValue) {
      setValue(defaultValue)
      onChange(defaultValue)
    }
  }, [defaultValue])

  useEffect(() => {
    if (!!rule) {
      if (isNumber) {
        if ((!!value || value === 0) && (parseFloat(value) > rule.max || parseFloat(value) < rule.min)) {
          setError(true) 
          !!onError && onError(true)
        } else {
          setError(false) 
          !!onError && onError(false)
        }
      } else {
        if (!!value && !rule.regex.test(value)) {
          setError(true) 
          !!onError && onError(true)
        } else {
          setError(false) 
          !!onError && onError(false)
        }
      }
    }
  }, [rule, value])

  const sendCode = async () => {
    if (!_email) return
    inputRef.current.focus()
    setSendLoad(true)
    const resp = await onVerification(_email)
      setSendLoad(false)
      if (!resp?.error) {
        countdown.start()
      }
  }

  return (
    <div className="m_input" style={style}>
      {
        !!label && <p className="m_input_name">{ label }</p>
      }
      <div className={classNames([
        "m_input_container",
        focused && "m_input_container_active",
        errored && "m_input_container_error",
        isDisabled && "m_input_container_readOnly",
      ])}>
        {
          !!onMax && isTextCenter && <div className="max_space" />
        }
        {
          isPhone && <p className="country_code">+1</p>
        }
        <Input
          ref={inputRef}
          autoComplete="false"
          readOnly={isDisabled}
          className={classNames([
            "input_container",
            isNumber && "input_number_container",
            isTextCenter && "input_center_container",
          ])}
          placeholder={placeholder}
          type={isNumber ? "number" : isPassword && !visiblePassword ?  "password" : "text"}
          value={value}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          onKeyDown={(e) => {
            if (isInt && e.key === ".") {
              e.preventDefault()
            }
          }}
          onChange={val => {
            const _val = isNumber ? mathematics.localString(val) : val
            setValue(_val)
            onChange(_val)
            isSignup && dataIndex === "email" && tDispatch({key: "tEmail", value: val})
            isForget && dataIndex === "email" && tDispatch({key: "tEmail", value: val})
            isEmail && dataIndex === "newEmail" && tDispatch({key: "tNewEmail", value: val})
          }}
        />
        {
          !!rightExtraDom ? rightExtraDom
          : !!onMax ? <p className="max_button" onClick={onMax}>{ t("component.input.t1") }</p>
          : isPassword ? <img src={!visiblePassword ? IMAGE.eye_close : IMAGE.eye_open} alt="" className="eye_button" onClick={() => setVisiblePassword(!visiblePassword)} />
          : !!onVerification ?
              sendLoad ? <SpinLoading className="spin_loading" />
              : countdown.time > 0 ? <p className="send_button send_button_disable">{`${t("component.input.t3")} ${countdown.time}s`}</p>
                : <p className={classNames([
                    "send_button",
                    !_email && "send_button_disable"
                  ])} onClick={sendCode}>{ t("component.input.t2") }</p>
                  : <></>
        }
      </div>
      {
        !!onForget && <p className="m_input_forget" onClick={onForget}>{ t("component.input.t4") }</p>
      }
      {
        !!bottomExtraDom && bottomExtraDom
      }
      <div className="m_input_regex_container">
      {
        !!rule && !!rule.tip && <p className={classNames([
          "m_input_regex",
          errored && "m_input_regex_error"
        ])}>{ rule.tip }</p>
      }
      {
        !!onSpecialMax && <div className="m_input_regex_max" onClick={onSpecialMax}>
          <img src={IMAGE.max} alt="" />
          <p>{ t("component.input.t1") }</p>
        </div>
      }
      </div>
    </div>
  )
}
IndexComponent.displayName = "m_input_item"

export default IndexComponent