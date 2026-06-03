const formatTime = date => {
  const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate()
  return `${y}-${m}-${d}`
}

module.exports = { formatTime }
