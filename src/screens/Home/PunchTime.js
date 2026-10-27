import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const PunchTime = () => {
    const getStatusLabel = (status) => {
        switch(status) {
            case 0:
                return 'Late'
            case 1:
                return 'Early Exit'
            case 2:
                return 'Logs Recorded'
            default:
                return ''
        }
    }

    const renderContainerView = (title, value, status, bgColor) => {
        return (
            <div className={`min-w-0 rounded-lg p-1 ${bgColor}`}>
                <div className='flex min-h-28 h-full min-w-0 items-center rounded-md bg-white px-3 py-3 sm:px-4'>
                    <div className='min-w-0'>
                        <div className='flex min-w-0 items-center'>
                            <div className={`mr-2 h-2 w-2 flex-shrink-0 rounded-full ${bgColor}`} />
                            <h2 className='truncate text-xs text-gray-500 sm:text-sm'>{title}</h2>
                        </div>
                        <p className='mt-1 truncate text-base font-bold sm:text-lg'>{value}</p>
                        <div className={`${bgColor} mt-2 inline-flex max-w-full rounded-md px-2 py-1`}>
                            <span className='truncate text-xs text-white'>{getStatusLabel(status)}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <section className='my-5 min-w-0' aria-label='Punch times'>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
            {renderContainerView('CHECK IN','10:43 AM', 0, 'bg-green-500')}
            {renderContainerView('CHECK OUT','06:31 PM', 1, 'bg-orange-500')}
            {renderContainerView('Work Hours','07:48 PM', 2, 'bg-purple-500')}
            {renderContainerView('PUNCHES','2', 2, 'bg-green-500')}
        </div>
    </section>
  )
}

export default PunchTime