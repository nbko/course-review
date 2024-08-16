import { BounceLoader } from "react-spinners";

// 로딩중이라는 것을 보여주기 위해 만들었는데 사용되고 있지는 않음
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
