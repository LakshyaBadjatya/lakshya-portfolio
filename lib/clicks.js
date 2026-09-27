/**
 * True only for an unmodified primary click that no other handler has taken:
 * the one case where an in-page link should glide instead of doing the
 * browser's default (Cmd/Ctrl-click opens a new tab, Shift a new window, and so on).
 */
export function isPlainLeftClick(event) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}
