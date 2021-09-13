import {TOTAL_PAGES} from '../db'
import Home from '@/components/home';

export default Home;
export async function getStaticProps(context) {
  return { 
    props: {
      totalPages:TOTAL_PAGES
    }
  }
}