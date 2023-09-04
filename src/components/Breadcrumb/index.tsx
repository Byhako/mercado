import { Fragment } from "react"
import { Path } from "@/types"
import './styles.css'

export default function BreadCrumb({ path }: { path: Path[] | undefined}) {
  if (!path) return null

  const items = path.map((item: Path) => item.name)
  const bread = items.join(' / ')

  return (
    <p className="breadcrumb">
      {bread}
    </p>
  )
}