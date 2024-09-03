export default function Icon(props: { icon: string; className?: string }) {
  return <i className={`bi ${props.icon} ${props.className}`}></i>;
}
