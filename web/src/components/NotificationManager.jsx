import Notification from "./Notification";

export default function NotificationManager() {
  return (
    <div className="w-50 fixed left-[50%] translate-x-[-50%] z-20">
      <Notification autoHide={true} />
    </div>
  )
}