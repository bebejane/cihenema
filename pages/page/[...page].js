import { getPosts, TOTAL_PAGES } from "../../db";
import Page from "@/components/page";

export default Page;

export async function getStaticPaths() {
	const paths = [];
	for (let index = 0; index < TOTAL_PAGES; index++) paths.push({ params: { page: ["" + (index + 1)] } });

	return {
		paths: paths,
		fallback: false,
	};
}
export async function getStaticProps(context) {
	const page = parseInt(context.params && context.params.page ? context.params.page[0] : 1);
	const posts = getPosts(page);
	const images = posts.reduce((acc, p) => acc + p.images.length, 0);

	return {
		props: {
			posts,
			images,
			page,
			totalPages: TOTAL_PAGES,
		},
	};
}
