export type Link = { href: string; name: string; hide?: boolean };

export function defineMenuLinks(...links: Link[]) {
  return links.filter((link) => !link.hide);
}
