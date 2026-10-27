import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faXmark, faCalendar, faMicrophone } from "@fortawesome/free-solid-svg-icons";

const NOTIFICATION_DATA = [
    {
        msg: 'Attendance Compliance: Late coming & Early punch-out recorded for 22 Oct 2026.',
        date: 'Oct 23, 2026 08:00 AM',
        type: 0
    },
    {
        msg: 'Official Announcement: "Navratri Fun Dandiya Making Activity"',
        date: 'Oct 19, 2026 04:18 PM',
        type: 1
    },
    {
        msg: 'New Workshop: "Festive Vibes, Dandiya & Best Dressed Awards! ✨" on Oct 19, 2026.',
        date: 'Oct 19, 2026 11:08 AM',
        type: 2
    },
    {
        msg: 'Attendance Compliance: Late coming recorded for 15 Oct 2026.',
        date: 'Oct 16, 2026 08:00 AM',
        type: 0
    },
    {
        msg: 'Attendance Compliance: Late coming & Early punch-out recorded for 14 Oct 2026.',
        date: 'Oct 15, 2026 08:00 AM',
        type: 0
    },
    {
        msg: 'Attendance Compliance: Late coming & Early punch-out recorded for 13 Oct 2026.',
        date: 'Oct 14, 2026 08:00 AM',
        type: 0
    },
    {
        msg: 'Attendance Compliance: Late coming recorded for 12 Oct 2026.',
        date: 'Oct 13, 2026 08:01 AM',
        type: 0
    },
    {
        msg: 'Attendance Compliance: Late coming & Early punch-out recorded for 09 Oct 2026.',
        date: 'Oct 12, 2026 08:00 AM',
        type: 0
    },
    {
        msg: 'Attendance Compliance: Late coming & Early punch-out recorded for 08 Oct 2026.',
        date: 'Oct 09, 2026 08:00 AM',
        type: 0
    },
    {
        msg: 'Attendance Compliance: Late coming & Early punch-out recorded for 07 Oct 2026.',
        date: 'Oct 08, 2026 08:00 AM',
        type: 0
    },
    {
        msg: 'Attendance Compliance: Late coming & Early punch-out recorded for 06 Oct 2026.',
        date: 'Oct 07, 2026 08:00 AM',
        type: 0
    },
    {
        msg: 'Attendance Compliance: Late coming recorded for 05 Oct 2026.',
        date: 'Oct 06, 2026 08:00 AM',
        type: 0
    }
]

const Notifications = (props) => {
  const { onScreenToggle, isOpen } = props;

  if(!isOpen) { return null }

  const renderHeader = () => { 
    return (
        <div className="flex justify-between items-center bg-white p-5">
            <div className="flex items-center">
                <FontAwesomeIcon icon={faBell} size="md" color="blue"/>
                <h1 className="ml-2 text-lg font-medium">Notifications</h1>
            </div>
            <button
                type="button"
                onClick={onScreenToggle}
                aria-label="Close notifications"
                className='px-2 rounded-md bg-gray-200'
            >
                <FontAwesomeIcon icon={faXmark} size="xs"/>
            </button>

        </div>
    )
  }

  const renderNotificationCard = (item) => {
    const { msg, date, type } = item;
    return (
        <div className="mb-2 overflow-hidden rounded-lg border-2 border-gray-200 shadow-lg md:mb-4">
            <div className="flex min-h-8 items-center justify-center gap-2 bg-gray-100 px-2 py-1 md:justify-between md:p-2 md:py-3">
                <div className="flex items-center">
                    <FontAwesomeIcon icon={type == 0? faBell: type == 1? faMicrophone: faCalendar } size="xs" color="blue"/>
                    <h1 className="ml-2 truncate text-xs font-medium">Notification</h1>
                </div>
                <p className="hidden text-xs text-gray-400 md:block">{date}</p>
            </div>
            <div className="bg-white p-2 py-2 md:py-4">
                <h1 className="text-sm text-slate-400">{msg}</h1>
            </div>
        </div>
    )
  }

  const renderBody = () => {
    return (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-gray-200 p-5">
            <h1 className="mb-4">Notifications</h1>
            <div className="min-h-0 flex-1 overflow-y-auto">
                {NOTIFICATION_DATA.map((item, index) => {
                    return (
                        <div key={`${item.date}-${index}`}>
                            {renderNotificationCard(item)}
                        </div>
                    );
                })
                }
            </div>
        </div>
    )
  }

  return (
    <div
      id="cart-view"
      className="fixed right-0 top-20 z-40 flex h-[calc(100vh-5rem)] w-3/12 min-w-64 max-w-sm flex-col overflow-hidden rounded-l-xl bg-gradient-to-b from-blue-300 to-blue-100 shadow-[-8px_-8px_16px_rgba(0,0,0,0.15)] 
            animate-[slideLeft_0.5s_ease-out]"
    >
      {renderHeader()}
      {renderBody()}
    </div>
  );
};

export default Notifications;
