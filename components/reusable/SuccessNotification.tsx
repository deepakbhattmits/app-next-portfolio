import { CheckCircleOutlined } from '@ant-design/icons'
const SuccessNotification = ({ text }: { text: string }) => {
  return (
    <div className="notification notification-success">
      <CheckCircleOutlined className="icon icon-success" />
      <span className='header'>{text}</span>
    </div>
  )
}
export default SuccessNotification
