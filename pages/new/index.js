import { TOTAL_PAGES, getPosts } from '../../db'
import Page from '@/components/page'

export default Page;

export async function getStaticProps(context) {
  const posts = getPosts(1)
  const images = posts.reduce((acc, p) => acc+p.images.length, 0);
  return { 
    props: {
      posts,
      images,
      totalPages:TOTAL_PAGES,
      newest:true
    }
  }
}