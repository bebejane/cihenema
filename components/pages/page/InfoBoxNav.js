import s from "./InfoBoxNav.module.scss";
import cn from "classnames";

import { useUI, UIAction, UIPopup } from "@/lib/context/ui";
import { useEffect, useState, useContext } from "react";
import { useBookmarks } from "@/lib/context/bookmarks";

export default function InfoBoxNav({ post }) {
	if (!post) return null;

	const [{}, setUI] = useUI();
	const [bookmarked, setBookmarked] = useState(false);
	const [bookmarks, setBookmarks] = useBookmarks();

	useEffect(() => {
    const isBookmarked = !!bookmarks.filter((b) => b.imdb === post.imdb).length
    setBookmarked(isBookmarked)
  },[post, bookmarks]);

	return (
    <nav className={s.icons}>
      <div
        className={s.find}
        onClick={() => setUI({ type: UIAction.SHOW_POPUP, popup: UIPopup.SEARCH })}
      >
        <img title={`Press 'F'`} src={"/images/find.svg"} />
      </div>
      <div
        className={s.find}
        onClick={() => setUI({ type: UIAction.SHOW_POPUP, popup: UIPopup.BOOKMARKS })}
      >
        <img title={`Press 'B'`} src={"/images/bookmark.svg"} />
      </div>
      <div
        className={cn(s.bookmark, { [s.toggled]: bookmarked })}
        onClick={() => setBookmarks({ post, type: "TOGGLE" })}
      >
        <img title={`Toggle bookmark`} src={"/images/plus.svg"} />
      </div>
      <div className={s.close} onClick={() => setUI({ type: UIAction.HIDE_INFO })}>
        <img title={`Press 'ESC'`} src={"/images/close.svg"} />
      </div>
    </nav>
  );
}
