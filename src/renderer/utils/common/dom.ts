export function calcDistanceToAncestor(
  element: HTMLElement,
  ancestor: HTMLElement,
) {
  const elementTop = element.getBoundingClientRect().top
  const ancestorTop =
    ancestor.firstElementChild?.getBoundingClientRect().top ??
    ancestor.getBoundingClientRect().top
  return elementTop - ancestorTop
}
