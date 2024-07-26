
interface SectionLabelProps {
  label: string
  message: string
}
export const SectionLabel = ({ label, message }: SectionLabelProps) => {
  return (
    <div>
      <p className="text-sm font-medium">{ label }</p>
      <p className="text-sm font-light">{ message }</p>
    </div>
  )
}
