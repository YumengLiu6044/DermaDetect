import { DocObj } from "../utility/fetch";

function DoctorCard(props: { doc: DocObj }) {
	return (
		<div className="flex gap-3 bg-white/95 border-1 border-gray-500 rounded-md p-3 shadow-xs">
			<img
				src={props.doc.profilePhotoUrl}
				className="w-20 h-20 rounded-full"
			/>
			<div className="flex flex-col gap-2">
				<span>{props.doc.name}</span>
				{props.doc.conditions.length > 0 && (
					<div className="flex gap-1 flex-wrap">
						{props.doc.conditions.slice(0, 3).map((item, index) => (
							<span
								className="rounded-full bg-gray-500 text-white px-1 text-xs"
								key={index}
							>
								{item}
							</span>
						))}
					</div>
				)}

				<div className="flex flex-col gap-1">
					<div className="flex gap-2 items-start">
						<i className="bi bi-geo-alt text-xs text-gray-400"></i>
						<span className="text-xs">{`${props.doc.location.address1}, ${props.doc.location.address2}, ${props.doc.location.stateProvince}`}</span>
					</div>
					{props.doc.location.website.length > 0 && (
						<div className="flex gap-2 items-start">
							<i className="bi bi-globe text-xs text-gray-400"></i>
							<a
								href={props.doc.location.website}
								className="text-xs"
							>
								{props.doc.location.website}
							</a>
						</div>
					)}
					{props.doc.location.phone.length > 0 && (
						<div className="flex gap-2 items-start">
							<i className="bi bi-telephone text-xs text-gray-400"></i>
							<span className="text-xs">
								{props.doc.location.phone}
							</span>
						</div>
					)}
				</div>
				<div className="flex flex-wrap gap-3">
					<span className="text-xs">
						<i
							className={
								props.doc.isUsingTelemedicine
									? "bi bi-check text-green-400"
									: "bi bi-x text-red-400"
							}
						></i>
						Telemedicine
					</span>
					<span className="text-xs">
						<i
							className={
								props.doc.isAcceptingNewPatients
									? "bi bi-check text-green-400"
									: "bi bi-x text-red-400"
							}
						></i>
						Accepting new patients
					</span>
					<span className="text-xs">
          <i
							className={
								props.doc.acceptsCareCredit
									? "bi bi-check text-green-400"
									: "bi bi-x text-red-400"
							}
						></i>Accepts
						care credit
					</span>
				</div>
			</div>
		</div>
	);
}

export default DoctorCard;
