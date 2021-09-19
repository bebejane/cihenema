import s from "./PopUp.module.scss";
import { useUI, UIAction, UIPopup } from "@/lib/context/ui";
import { useEffect } from "react";

export default function PopUp({ header, show, type, children }) {

	if (!show) return null;
	const [{}, setUI] = useUI();

	return (
		<aside className={s.popup}>
			<div className={s.wrap}>
				<div className={s.header}>
					{header}
					<div className={s.close} onClick={(e) => setUI({type:UIAction.HIDE_POPUP, popup:UIPopup[type]})}>
						<img src={"/images/close.svg"} />
					</div>
				</div>
				<div className={s.content}>{children}</div>
			</div>
		</aside>
	);
}

