import s from "./Bookmarks.module.scss";
import Link from "next/link";
import PopUp from "./PopUp";
import { useBookmarks } from "@/lib/context/bookmarks";
import { useUI, UIPopup, UIAction } from "@/lib/context/ui";

export default function Bookmarks({ }) {
	const [bookmarks, setBookmarks] = useBookmarks()
	const [{popup}, setUI] = useUI();

	return (
		<PopUp 
			header={"Bookmarks"} 
			show={popup === UIPopup.BOOKMARKS} 
			type={UIPopup.BOOKMARKS
		}>
			<ul className={s.list}>
				{bookmarks.length ? bookmarks.map(({page, imdb, titleEnglish, title, director, year}, idx) => (
					<li key={idx} className={s.item} onClick={(e) => setUI({type:UIAction.HIDE_POPUP, popup:UIPopup.BOOKMARKS})}>
						<Link href={`/page/${page}#${imdb}`} >
							<a>
								<div className={s.title}>
									{titleEnglish || title}
									<div className={s.director}>
										{director} ({year})
									</div>
								</div>
							</a>
						</Link>
						<div className={s.delete} onClick={() => setBookmarks({type:'DELETE', id:imdb})}>
							<img src={"/images/minus.svg"} />
						</div>
					</li>
				))
				:
					<div className={s.empty}>
						Nix hier...
					</div>
				}
			</ul>
		</PopUp>
	);
}
