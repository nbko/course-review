import { BounceLoader } from "react-spinners";

export default function Error() {
	return (
		<div>
			<div className="error">
				<BounceLoader />
			</div>
			<div className="loading">Loading...</div>
		</div>
	);
}
