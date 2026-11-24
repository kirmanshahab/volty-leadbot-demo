import { HOSTED_CHAT_URL } from './config'

declare global {
  interface Window {
    __voltyShadow?: ShadowRoot
  }
}

let open = false
if (typeof window !== 'undefined') {
  window.addEventListener('volty:chat-opened', () => (open = true))
  window.addEventListener('volty:chat-closed', () => (open = false))
}

/**
 * Opens the Volty chat. The widget has no public open call, so this clicks its launcher through the shadow
 * root handle that index.html keeps. When that is not available (widget blocked, not loaded yet, or the
 * domain is not on the allowed list), it opens the hosted chat page in a new tab instead.
 */
export function openWidget(): 'widget' | 'hosted' {
  const launcher = window.__voltyShadow?.querySelector<HTMLButtonElement>('button.launcher')
  if (launcher) {
    if (!open) launcher.click()
    return 'widget'
  }
  window.open(HOSTED_CHAT_URL, '_blank', 'noopener,noreferrer')
  return 'hosted'
}
