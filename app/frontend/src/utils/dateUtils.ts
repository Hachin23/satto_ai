/**
 * Dateオブジェクトまたは日付文字列を「YYYY/MM/DD HH:mm」形式の文字列に変換するメソッド
 * @param dateInput - 変換したい日付（Dateオブジェクト、または日付型の文字列）
 * @returns フォーマットされた日付文字列
 */
export const formatDate = (dateInput: Date | string | null | undefined): string => {
  if (!dateInput) return ''

  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

  if (isNaN(date.getTime())) {
    console.error('Invalid date passed to formatDate:', dateInput)
    return ''
  }

  const yyyy = date.getFullYear()

  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')

  return `${yyyy}/${mm}/${dd} ${hh}:${min}`
}