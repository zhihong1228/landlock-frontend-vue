export const errMessage = payload => {
  console.error('caught-error:', payload)
  return (
    (payload.response
        && payload.response.data
        && payload.response.data.message)
      || payload.message
      || payload.toString()
  )
}

export const xyz = 123
