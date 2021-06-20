const isScrollable = function (ele: HTMLElement) {
  const hasScrollableContent = ele.scrollHeight > ele.clientHeight

  const overflowYStyle = window.getComputedStyle(ele).overflowY
  const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1

  return hasScrollableContent && !isOverflowHidden
}

export function getScrollableParent(
  ele: HTMLElement | null,
): HTMLElement | null {
  if (!ele) return null
  return ele === document.body
    ? document.body
    : isScrollable(ele)
    ? ele
    : getScrollableParent(ele.parentElement)
}

export function calcDistanceToAncestor(
  element: HTMLElement,
  ancestor: HTMLElement,
) {
  const elementTop = element.getBoundingClientRect().top
  const ancestorTop = ancestor.firstElementChild!.getBoundingClientRect().top
  return elementTop - ancestorTop
}
