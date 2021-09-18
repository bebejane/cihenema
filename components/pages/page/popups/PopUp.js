import s from "./PopUp.module.scss";

export default function PopUp({ header, show, setShow, children }) {
	if (!show) return null;

	return (
		<div className={s.popup} onClick={(e) => e.stopPropagation()}>
			<div className={s.wrap}>
				<div className={s.header}>
					{header}
					<div className={s.close} onClick={(e) => setShow(false)}>
						<img src={"/images/close.svg"} />
					</div>
				</div>
				<div className={s.content}>{children}</div>
			</div>
		</div>
	);
}

