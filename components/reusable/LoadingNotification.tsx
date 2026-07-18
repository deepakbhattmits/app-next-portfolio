import { LoadingOutlined } from '@ant-design/icons'

const LoadingNotification = () => {
  return (
    <div className="notification notification-loading">
      <LoadingOutlined className="icon icon-loading" />
      <span className="header">Loading</span>
    </div>
  )
}
export default LoadingNotification
