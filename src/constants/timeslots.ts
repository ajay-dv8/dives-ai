type AppointmentTimeSlots = {
  slot: string
}

export const APPOINTMENT_TIME_SLOTS: AppointmentTimeSlots[] = [
  {
    slot: '12:30pm',
  },
  {
    slot: '1:00pm',
  },
  {
    slot: '2:00pm',
  },
  {
    slot: '3:00pm',
  },
  {
    slot: '4:00pm',
  },
  {
    slot: '5:00pm',
  },
]


export const getMonthName = (month: number) => {
  return month == 1
    ? 'Jan'
    : month == 2
    ? 'Feb'
    : month == 3
    ? 'Mar'
    : month == 4
    ? 'Apr'
    : month == 5
    ? 'May'
    : month == 6
    ? 'Jun'
    : month == 7
    ? 'Jul'
    : month == 8
    ? 'Aug'
    : month == 9
    ? 'Sep'
    : month == 10
    ? 'Oct'
    : month == 11
    ? 'Nov'
    : month == 12 && 'Dec'
}
