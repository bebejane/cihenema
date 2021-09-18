import {TOTAL_PAGES} from '@/lib/db'
import Home from '/components/pages/home';

export default Home;
export async function getStaticProps(context) {
  return { 
    props: {
      totalPages:TOTAL_PAGES
    }
  }
}