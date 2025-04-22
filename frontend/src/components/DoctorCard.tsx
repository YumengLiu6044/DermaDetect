import { DocObj } from "../utility/fetch"

function DoctorCard(doc: DocObj) {
  return (
    <div>
      {doc.firstName}
    </div>
  )
}

export default DoctorCard
