import { WarningOutlined } from '@ant-design/icons'
const ErrorNotification = ({ text }: { text: string }) => {
  return (
    <div className="notification notification-error">
      <WarningOutlined className="icon icon-warning" />
      <span className="header">{text}</span>
    </div>
  )
}
export default ErrorNotification
