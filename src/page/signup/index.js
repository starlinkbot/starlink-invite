import { useState } from "react"
import { withRouter } from "react-router-dom"
import { Toast } from "antd-mobile"
import { MNavbar, MForm, MInput } from "@/component"
import { useConstant, useRoute, useRequest } from "@/hook"
import { useLocalStore } from "@/store"
import { useTranslation } from "react-i18next"
import "./styles.less"

const IndexPage = ({ history }) => {
  const { t } = useTranslation()
  const { push } = useRoute()
  const { NAVBARTYPE } = useConstant()
  const { request } = useRequest()
  const { lState } = useLocalStore()
  const [loading, setLoading] = useState(false)
  const { lCode } = lState

  const sendCode = async (email) => {
    const resp = await request("app/account/sendEmailVerifyCodeV4", {
      email: email,
      tag: "SIGNUP"
    })
    return resp
  }

  const signup = async (params) => {
    setLoading(true)
    const verifyResp = await request("app/account/emailVerify", {
      email: params.email,
      tag: "SIGNUP",
      code: params.verify_code
    })
    if (!!verifyResp?.error) {
      setLoading(false)
    } else {
      const registerResp = await request("app/account/signUp/email/v2", {
        ...params,
        verify_code_tag: "SIGNUP"
      })
      if (!!registerResp?.error) {
        setLoading(false)
      } else {
        Toast.show({
          icon: "success",
          content: t("page.signup.t10")
        })
        setTimeout(() => {
          push("/success")
        }, 1000)
      }
    }
  }
  
  return (
    <div className="p_signup">
      <MNavbar 
        title={ t("page.signup.t1") }
        type={NAVBARTYPE.light}
      />
      <MForm 
        lable={ t("page.signup.t1") }
        loading={loading}
        actionFunc={signup}
        space={40}
      >
        <MInput 
          dataIndex="email" 
          label={ t("page.signup.t2") }
          placeholder={ t("page.signup.t2") } 
        />
        <MInput 
          dataIndex="verify_code" 
          label={ t("page.signup.t3") }
          placeholder={ t("page.signup.t4") }
          onVerification={sendCode} 
        />
        <MInput 
          dataIndex="password" 
          label={ t("page.signup.t5") }
          placeholder={ t("page.signup.t6") }
          isPassword 
          rule={{
            tip: t("page.signup.t7"),
            regex: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
          }}
        />
        <MInput 
          dataIndex="invite_code" 
          label={ t("page.signup.t8") }
          placeholder={ t("page.signup.t9") }
          isDisabled={!!lCode ? true : false}
          defaultValue={lCode || ""}
        />
      </MForm>
    </div>
  )
}
export default withRouter(IndexPage)