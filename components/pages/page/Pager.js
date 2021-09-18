import s from "./Pager.module.scss";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Pager({ handleLoad, nextPage, loading, page, setDeloading }) {
	const router = useRouter();
	const [clicked, setClicked] = useState(false);
	const buttonStyle = cn({ [s.clicked]: clicked });
	const loadingStyle = cn(s["lds-hourglass"], s.heartbeat);

	useEffect(() => router.prefetch(`/page/${nextPage}`).then(), []);
	const gotToNextPage = () => {
		setClicked(true);
		setDeloading(true);
		setTimeout(() => router.push(`/page/${nextPage}`), 1300);
	};
	
	return (
		<div className={s.pager} onClick={(e) => e.stopPropagation()}>
			<a onMouseDown={gotToNextPage} onTouchStart={gotToNextPage}>
				{!loading && 
					<div className={buttonStyle}>
						<span>{page}</span>
					</div>
				}
				{loading && <div className={loadingStyle}></div>}
			</a>
			{/*<Link href={`/page/${nextPage}`} ></Link>*/}
		</div>
	);
}
