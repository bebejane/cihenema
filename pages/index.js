import Home from '@/components/home';
import {TOTAL_PAGES} from '../db'

export default Home;

export async function getStaticProps(context) {
  console.log(TOTAL_PAGES)
  return { 
    props: {
      totalPages:TOTAL_PAGES
    }
  }
}