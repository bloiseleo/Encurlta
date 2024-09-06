type Props = {
  children?: string
}
export default function Title({ children }: Props) {
  return <h1 className={"font-pacifico text-3xl"}>{children}</h1>
}